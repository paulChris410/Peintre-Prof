/*!
 * MAISON NDAMEN — Luxury Motion Engine v1.0
 * ---------------------------------------------------------------------------
 *  • WebGL hero: domain-warped "liquid gold marble" GLSL backdrop, PBR
 *    gold-leaf plaster rosettes (procedural lathe + extruded acanthus leaves)
 *    and GPU-animated gold-dust particles, mouse + scroll reactive
 *  • Interactive 3D Atelier: physically based staff ceiling rose with
 *    drag-to-rotate inertia, live finish morphing (plaster, gold leaf,
 *    ebony lacquer, ochre stucco, wireframe blueprint), soft shadows and a
 *    scroll-scrubbed assembly / exploded view
 *  • GSAP ScrollTrigger choreography (3D heading flips, perspective grids,
 *    clip-path reveals, velocity-reactive marquee) + Lenis inertial scroll
 *  • Cinematic preloader, magnetic CTAs, gold-dust cursor trail
 *
 *  Browser : <script src="js/luxury-motion-engine.js"></script>
 *            LuxuryMotion.init()        // uses window.THREE / gsap / ScrollTrigger / Lenis
 *  Bundler : import '../js/luxury-motion-engine.js'
 *            globalThis.LuxuryMotion.init({ THREE, gsap, ScrollTrigger, Lenis })
 */
(function (root, factory) {
  var api = factory(root)
  root.LuxuryMotion = api
  if (typeof module === 'object' && module && module.exports) module.exports = api
})(typeof globalThis !== 'undefined' ? globalThis : window, function (root) {
  'use strict'

  var deps = null
  var cleanups = []
  var hero = null
  var atelier = null
  var reduced = false
  var gsapCtx = null
  var pendingFinish = 'gold'
  var pendingExplode = false

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------
  function on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts)
    cleanups.push(function () { target.removeEventListener(type, fn, opts) })
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }
  function lerp(a, b, t) { return a + (b - a) * t }
  function isTouchDevice() { return window.matchMedia('(hover: none)').matches }

  function configureRenderer(renderer) {
    var THREE = deps.THREE
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace
    else if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding
    if ('physicallyCorrectLights' in renderer) renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
  }

  // sRGB hex -> working (linear) colour, compatible with legacy + modern three.js
  function color(hex) {
    var THREE = deps.THREE
    var c = new THREE.Color(hex)
    var CM = THREE.ColorManagement
    if (!(CM && CM.enabled === true) && c.convertSRGBToLinear) c.convertSRGBToLinear()
    return c
  }

  // Render loop that sleeps when the canvas is off-screen or the tab is hidden
  function createLoop(container, render) {
    var raf = 0
    var running = false
    var inView = true
    function frame() { raf = requestAnimationFrame(frame); render() }
    function start() { if (running || document.hidden || !inView) return; running = true; raf = requestAnimationFrame(frame) }
    function stop() { running = false; cancelAnimationFrame(raf) }
    var io = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting
      if (inView) start(); else stop()
    }, { rootMargin: '160px 0px' })
    io.observe(container)
    var onVis = function () { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)
    start()
    return { dispose: function () { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis) } }
  }

  // Procedural studio lighting environment (no external HDR needed)
  function buildStudioEnvironment(renderer) {
    var THREE = deps.THREE
    var pmrem = new THREE.PMREMGenerator(renderer)
    var env = new THREE.Scene()
    var disposables = []
    function track(o) { disposables.push(o); return o }
    env.add(new THREE.Mesh(track(new THREE.SphereGeometry(12, 32, 16)), track(new THREE.MeshBasicMaterial({ color: 0x090c16, side: THREE.BackSide }))))
    function panel(hex, strength, w, h, x, y, z) {
      var mat = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(strength), side: THREE.DoubleSide }))
      var mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(w, h)), mat)
      mesh.position.set(x, y, z)
      mesh.lookAt(0, 0, 0)
      env.add(mesh)
    }
    panel(0xffffff, 6, 8, 3, 0, 7, 4)
    panel(0xffe2b0, 4, 3, 8, -8, 1, 3)
    panel(0xffbf5e, 3, 3, 8, 8, -1, -2)
    panel(0x7f9cff, 1.1, 10, 2.5, 0, -7, 1)
    panel(0xffffff, 2.5, 2, 2, 3, 3, 8)
    var texture = pmrem.fromScene(env, 0.04).texture
    pmrem.dispose()
    disposables.forEach(function (d) { d.dispose() })
    return texture
  }

  // ---------------------------------------------------------------------------
  // Shaders
  // ---------------------------------------------------------------------------
  var FULLSCREEN_VERT = 'varying vec2 vUv;\nvoid main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }'

  var LIQUID_GOLD_FRAG = [
    'varying vec2 vUv;',
    'uniform float uTime; uniform vec2 uMouse; uniform vec2 uRes; uniform float uScroll; uniform float uReveal;',
    'float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }',
    'float fbm(vec2 p){ float v = 0.0; float a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);',
    '  for (int i = 0; i < 6; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v; }',
    'void main(){',
    '  vec2 uv = vUv;',
    '  vec2 p = (uv - 0.5) * vec2(uRes.x / max(uRes.y, 1.0), 1.0) * 2.4;',
    '  p += (uMouse - 0.5) * 0.35;',
    '  float t = uTime * 0.05;',
    '  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));',
    '  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.9));',
    '  float f = fbm(p + 2.6 * r + uScroll * 1.2);',
    '  vec3 ink = vec3(0.024, 0.035, 0.07);',
    '  vec3 navy = vec3(0.055, 0.075, 0.13);',
    '  vec3 col = mix(ink, navy, smoothstep(0.25, 0.85, f));',
    '  float veinA = 1.0 - smoothstep(0.0, 0.018, abs(f - 0.56 - 0.06 * q.x));',
    '  float veinB = 1.0 - smoothstep(0.0, 0.035, abs(r.y - 0.5));',
    '  vec3 gold = vec3(0.98, 0.72, 0.28);',
    '  vec3 goldDeep = vec3(0.72, 0.42, 0.10);',
    '  col += mix(goldDeep, gold, f) * veinA * 0.85;',
    '  col += goldDeep * veinB * 0.22 * smoothstep(0.3, 0.9, f);',
    '  col += gold * 0.08 * pow(max(f, 0.0), 3.0);',
    '  col += gold * exp(-6.0 * length(uv - uMouse)) * 0.08;',
    '  float vig = smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(1.3, 1.0)));',
    '  col *= mix(0.35, 1.0, vig);',
    '  col *= uReveal;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n')

  var DUST_VERT = [
    'uniform float uTime; uniform float uPixelRatio; uniform float uSize; uniform float uHeight;',
    'attribute float aSeed; varying float vAlpha;',
    'void main(){',
    '  vec3 p = position;',
    '  p.y = mod(p.y + uHeight * 0.5 + uTime * (0.08 + aSeed * 0.18), uHeight) - uHeight * 0.5;',
    '  p.x += sin(uTime * 0.35 + aSeed * 31.0) * 0.35;',
    '  p.z += cos(uTime * 0.27 + aSeed * 17.0) * 0.25;',
    '  vec4 mv = modelViewMatrix * vec4(p, 1.0);',
    '  gl_Position = projectionMatrix * mv;',
    '  gl_PointSize = uSize * uPixelRatio * (0.25 + aSeed * 0.9) / max(0.1, -mv.z);',
    '  vAlpha = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 60.0));',
    '}'
  ].join('\n')

  var DUST_FRAG = [
    'varying float vAlpha;',
    'void main(){',
    '  float d = length(gl_PointCoord - 0.5);',
    '  float core = smoothstep(0.5, 0.0, d);',
    '  float a = core * core * vAlpha;',
    '  if (a < 0.01) discard;',
    '  gl_FragColor = vec4(mix(vec3(1.0, 0.62, 0.2), vec3(1.0, 0.92, 0.7), core), a);',
    '}'
  ].join('\n')

  function createGoldDust(THREE, count, spread, pixelRatio, size) {
    var geo = new THREE.BufferGeometry()
    var pos = new Float32Array(count * 3)
    var seed = new Float32Array(count)
    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread.x
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread.y
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread.z
      seed[i] = Math.random()
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    var uniforms = { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio }, uSize: { value: size || 42 }, uHeight: { value: spread.y } }
    var mat = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: DUST_VERT, fragmentShader: DUST_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
    var points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    return { points: points, uniforms: uniforms, dispose: function () { geo.dispose(); mat.dispose() } }
  }

  // ---------------------------------------------------------------------------
  // Procedural staff ceiling rose (lathe body + acanthus leaves + pearls)
  // ---------------------------------------------------------------------------
  function rosetteProfile(THREE) {
    var pts = []
    var i, a, t, s
    function add(x, y) { pts.push(new THREE.Vector2(x, y)) }
    for (i = 0; i <= 12; i++) { a = (i / 12) * Math.PI * 0.5; add(Math.sin(a) * 0.32, 0.3 + Math.cos(a) * 0.3) } // central dome
    add(0.4, 0.3)                                                                                                   // fillet
    for (i = 1; i <= 10; i++) { a = Math.PI + (i / 10) * Math.PI * 0.5; add(0.58 + Math.cos(a) * 0.18, 0.3 + Math.sin(a) * 0.18) } // cove
    add(0.62, 0.12)
    for (i = 1; i <= 10; i++) { a = Math.PI - (i / 10) * Math.PI; add(0.7 + Math.cos(a) * 0.08, 0.12 + Math.sin(a) * 0.08) }       // torus bead
    add(0.8, 0.1)
    for (i = 1; i <= 10; i++) { t = i / 10; s = t * t * (3 - 2 * t); add(0.8 + t * 0.35, 0.1 - s * 0.06) }                          // ogee
    for (i = 1; i <= 8; i++) { a = Math.PI - (i / 8) * Math.PI; add(1.19 + Math.cos(a) * 0.04, 0.04 + Math.sin(a) * 0.04) }         // outer bead
    add(1.26, 0.03)
    add(1.27, 0.0)
    return pts
  }

  function leafGeometry(THREE) {
    var s = new THREE.Shape()
    s.moveTo(0, 0)
    s.bezierCurveTo(0.075, 0.03, 0.12, 0.16, 0.03, 0.27)
    s.quadraticCurveTo(0.012, 0.31, 0, 0.36)
    s.quadraticCurveTo(-0.012, 0.31, -0.03, 0.27)
    s.bezierCurveTo(-0.12, 0.16, -0.075, 0.03, 0, 0)
    var g = new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.022, bevelSize: 0.018, bevelSegments: 5, curveSegments: 20 })
    g.rotateX(-Math.PI / 2)
    return g
  }

  function buildRosette(THREE, material, opts) {
    opts = opts || {}
    var seg = opts.segments || 96
    var group = new THREE.Group()
    var parts = []
    var geometries = []
    var dummy = new THREE.Object3D()

    function part(mesh, offset) {
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)
      parts.push({ mesh: mesh, base: mesh.position.y, offset: offset })
      return mesh
    }
    function geo(g) { geometries.push(g); return g }

    part(new THREE.Mesh(geo(new THREE.LatheGeometry(rosetteProfile(THREE), seg)), material), 0)

    var ring = new THREE.Mesh(geo(new THREE.TorusGeometry(0.335, 0.03, 18, seg)), material)
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.3
    part(ring, 0.9)

    var leaf = geo(leafGeometry(THREE))
    function leafRing(count, radius, height, tilt, scale, phase, offset) {
      var inst = new THREE.InstancedMesh(leaf, material, count)
      for (var i = 0; i < count; i++) {
        var ang = (i / count) * Math.PI * 2 + phase
        dummy.rotation.set(tilt, ang, 0, 'YXZ')
        dummy.position.set(-Math.sin(ang) * radius, height, -Math.cos(ang) * radius)
        dummy.scale.setScalar(scale)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
      }
      inst.instanceMatrix.needsUpdate = true
      return part(inst, offset)
    }
    var leaves = opts.leaves || 16
    leafRing(leaves, 0.36, 0.31, -0.42, 1, 0, 0.55)
    leafRing(leaves, 0.8, 0.11, -0.1, 0.5, Math.PI / leaves, 0.32)
    leafRing(8, 0.06, 0.6, -0.95, 0.38, 0, 1.05)

    var pearlCount = opts.pearls || 60
    var pearls = new THREE.InstancedMesh(geo(new THREE.SphereGeometry(0.03, 14, 10)), material, pearlCount)
    dummy.rotation.set(0, 0, 0)
    dummy.scale.setScalar(1)
    for (var p = 0; p < pearlCount; p++) {
      var pa = (p / pearlCount) * Math.PI * 2
      dummy.position.set(Math.cos(pa) * 1.08, 0.075, Math.sin(pa) * 1.08)
      dummy.updateMatrix()
      pearls.setMatrixAt(p, dummy.matrix)
    }
    pearls.instanceMatrix.needsUpdate = true
    part(pearls, 0.2)

    var finial = new THREE.Mesh(geo(new THREE.SphereGeometry(0.08, 24, 16)), material)
    finial.position.y = 0.64
    part(finial, 1.25)

    return { group: group, parts: parts, dispose: function () { geometries.forEach(function (g) { g.dispose() }) } }
  }

  // ---------------------------------------------------------------------------
  // HERO — liquid gold WebGL backdrop + floating PBR rosettes + gold dust
  // ---------------------------------------------------------------------------
  function createHeroScene(container) {
    if (!container) return null
    var THREE = deps.THREE
    var gsap = deps.gsap
    var touch = isTouchDevice()

    var renderer = new THREE.WebGLRenderer({ antialias: !touch, alpha: true, powerPreference: 'high-performance' })
    configureRenderer(renderer)
    renderer.toneMappingExposure = 1.1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 1.75))
    var canvas = renderer.domElement
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
    container.appendChild(canvas)

    var scene = new THREE.Scene()
    scene.environment = buildStudioEnvironment(renderer)
    var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    var camZ = { value: 9 }
    camera.position.set(0, 0, camZ.value)

    var uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
      uReveal: { value: 1 }
    }
    var bgMat = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: FULLSCREEN_VERT, fragmentShader: LIQUID_GOLD_FRAG, depthTest: false, depthWrite: false })
    var bg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat)
    bg.frustumCulled = false
    bg.renderOrder = -10
    scene.add(bg)

    var gold = new THREE.MeshPhysicalMaterial({ color: color('#d9a93f'), metalness: 1, roughness: 0.24, clearcoat: 0.3, clearcoatRoughness: 0.2, envMapIntensity: 1.35, side: THREE.DoubleSide })

    var stage = new THREE.Group()
    scene.add(stage)
    var layout = [
      { x: 3.9, y: 1.9, z: -2.6, s: 1.85, rx: 0.35, ry: -0.5, spin: 0.08 },
      { x: -4.6, y: -2.1, z: -1.8, s: 1.05, rx: -0.25, ry: 0.6, spin: -0.12 },
      { x: 1.6, y: -2.7, z: -0.6, s: 0.5, rx: 0.6, ry: 0.2, spin: 0.2 },
      { x: -2.2, y: 2.6, z: -4.2, s: 0.8, rx: -0.4, ry: -0.3, spin: -0.06 }
    ]
    var ornaments = layout.map(function (L, i) {
      var r = buildRosette(THREE, gold, { segments: 72, leaves: 14, pearls: 44 })
      r.group.rotation.x = Math.PI / 2
      var holder = new THREE.Group()
      holder.add(r.group)
      holder.position.set(L.x, L.y, L.z)
      holder.scale.setScalar(L.s)
      holder.rotation.set(L.rx, L.ry, 0)
      stage.add(holder)
      return { holder: holder, rosette: r, L: L, phase: i * 1.7 }
    })

    var key = new THREE.DirectionalLight(0xfff1dc, 2.2)
    key.position.set(-3, 4, 6)
    scene.add(key)
    var rim = new THREE.PointLight(0xffb347, 30, 0, 2)
    rim.position.set(4, -2, 3)
    scene.add(rim)
    scene.add(new THREE.HemisphereLight(0xffe9c7, 0x05070d, 0.5))

    var dust = createGoldDust(THREE, touch ? 380 : 900, new THREE.Vector3(18, 10, 8), renderer.getPixelRatio(), 42)
    scene.add(dust.points)

    var pointer = { x: 0, y: 0, sx: 0, sy: 0 }
    on(window, 'pointermove', function (e) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }, { passive: true })

    var state = { scroll: 0 }
    var section = container.closest('section') || container
    if (deps.ScrollTrigger && !reduced) {
      var st = deps.ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom top', scrub: true, onUpdate: function (self) { state.scroll = self.progress } })
      cleanups.push(function () { st.kill() })
    } else {
      on(window, 'scroll', function () { state.scroll = clamp(window.scrollY / (section.offsetHeight || 1), 0, 1) }, { passive: true })
    }

    function resize() {
      var w = container.clientWidth
      var h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      uniforms.uRes.value.set(w, h)
      var spread = clamp(camera.aspect / 1.6, 0.45, 1)
      ornaments.forEach(function (o) { o.holder.position.x = o.L.x * spread })
    }
    var ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    var t0 = performance.now()
    var last = t0
    var loop = createLoop(container, function () {
      var now = performance.now()
      var dt = Math.min(0.05, (now - last) / 1000)
      var t = (now - t0) / 1000
      last = now
      pointer.sx = lerp(pointer.sx, pointer.x, 0.05)
      pointer.sy = lerp(pointer.sy, pointer.y, 0.05)

      uniforms.uTime.value = t
      uniforms.uMouse.value.set(pointer.sx * 0.5 + 0.5, pointer.sy * 0.5 + 0.5)
      uniforms.uScroll.value = state.scroll
      dust.uniforms.uTime.value = t

      camera.position.x = pointer.sx * 0.6
      camera.position.y = pointer.sy * 0.4 - state.scroll * 0.5
      camera.position.z = camZ.value + state.scroll * 2.5
      camera.lookAt(0, 0, 0)

      stage.position.y = state.scroll * 2.4
      stage.rotation.y = pointer.sx * 0.12
      ornaments.forEach(function (o) {
        o.rosette.group.rotation.y += o.L.spin * dt
        o.holder.position.y = o.L.y + Math.sin(t * 0.6 + o.phase) * 0.18
        o.holder.rotation.x = o.L.rx + Math.sin(t * 0.4 + o.phase) * 0.08 + state.scroll * 0.8
        o.holder.rotation.y = o.L.ry + pointer.sx * 0.25
      })
      rim.position.x = Math.cos(t * 0.5) * 5
      rim.position.z = 3 + Math.sin(t * 0.5) * 2

      renderer.render(scene, camera)
    })

    function intro() {
      if (!gsap) return null
      var tl = gsap.timeline()
      tl.fromTo(uniforms.uReveal, { value: 0 }, { value: 1, duration: 2.4, ease: 'power2.out' }, 0)
      tl.fromTo(camZ, { value: 16 }, { value: 9, duration: 2.8, ease: 'expo.out' }, 0)
      ornaments.forEach(function (o, i) {
        tl.fromTo(o.holder.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: o.L.s, y: o.L.s, z: o.L.s, duration: 2.2, ease: 'expo.out' }, 0.2 + i * 0.12)
        tl.fromTo(o.rosette.group.rotation, { y: -Math.PI * 1.2 }, { y: 0, duration: 2.6, ease: 'expo.out' }, 0.2 + i * 0.12)
      })
      return tl
    }

    return {
      intro: intro,
      dispose: function () {
        loop.dispose()
        ro.disconnect()
        ornaments.forEach(function (o) { o.rosette.dispose() })
        gold.dispose()
        bgMat.dispose()
        bg.geometry.dispose()
        dust.dispose()
        if (scene.environment) scene.environment.dispose()
        renderer.dispose()
        canvas.remove()
      }
    }
  }

  // ---------------------------------------------------------------------------
  // ATELIER 3D — interactive PBR rosette with finishes + exploded view
  // ---------------------------------------------------------------------------
  var FINISHES = {
    gold: { color: '#dcab45', metalness: 1.0, roughness: 0.2, clearcoat: 0.25, emissive: '#000000', wire: false, env: 1.4 },
    plaster: { color: '#f1ece3', metalness: 0.0, roughness: 0.78, clearcoat: 0.02, emissive: '#000000', wire: false, env: 0.8 },
    lacquer: { color: '#0e1016', metalness: 0.2, roughness: 0.1, clearcoat: 1.0, emissive: '#000000', wire: false, env: 1.2 },
    ochre: { color: '#a65f3a', metalness: 0.0, roughness: 0.45, clearcoat: 0.35, emissive: '#000000', wire: false, env: 1.0 },
    blueprint: { color: '#0b1220', metalness: 0.0, roughness: 1.0, clearcoat: 0.02, emissive: '#f59e0b', wire: true, env: 0.2 }
  }

  function applyFinish(material, key, instant) {
    var f = FINISHES[key] || FINISHES.gold
    var gsap = deps.gsap
    var c = color(f.color)
    var e = color(f.emissive)
    material.wireframe = f.wire
    if (gsap && !instant && !reduced) {
      gsap.to(material.color, { r: c.r, g: c.g, b: c.b, duration: 1.1, ease: 'power3.inOut', overwrite: true })
      gsap.to(material.emissive, { r: e.r, g: e.g, b: e.b, duration: 1.1, ease: 'power3.inOut', overwrite: true })
      gsap.to(material, { metalness: f.metalness, roughness: f.roughness, clearcoat: f.clearcoat, envMapIntensity: f.env, duration: 1.1, ease: 'power3.inOut', overwrite: 'auto' })
    } else {
      material.color.copy(c)
      material.emissive.copy(e)
      material.metalness = f.metalness
      material.roughness = f.roughness
      material.clearcoat = f.clearcoat
      material.envMapIntensity = f.env
    }
  }

  function createAtelierScene(container) {
    if (!container) return null
    var THREE = deps.THREE
    var gsap = deps.gsap
    var touch = isTouchDevice()

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    configureRenderer(renderer)
    renderer.toneMappingExposure = 1.0
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2))
    renderer.setClearColor(0x070a12, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    var canvas = renderer.domElement
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y'
    container.appendChild(canvas)

    var scene = new THREE.Scene()
    scene.environment = buildStudioEnvironment(renderer)
    scene.fog = new THREE.Fog(0x070a12, 9, 20)
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60)
    var camBase = 6.6
    camera.position.set(0, 0, camBase)

    // Architectural backdrop with engraved blueprint rings
    var backdropGeo = new THREE.PlaneGeometry(40, 40)
    var backdropMat = new THREE.MeshStandardMaterial({ color: color('#121826'), roughness: 0.92, metalness: 0 })
    var backdrop = new THREE.Mesh(backdropGeo, backdropMat)
    backdrop.position.z = -1.6
    backdrop.receiveShadow = true
    scene.add(backdrop)

    var ringMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.12 })
    var ringGeos = []
    ;[1.6, 2.2, 3.0, 4.1].forEach(function (radius) {
      var pts = []
      for (var i = 0; i <= 128; i++) { var a = (i / 128) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, -1.58)) }
      var g = new THREE.BufferGeometry().setFromPoints(pts)
      ringGeos.push(g)
      scene.add(new THREE.Line(g, ringMat))
    })
    var crossGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5, 0, -1.58), new THREE.Vector3(5, 0, -1.58),
      new THREE.Vector3(0, -5, -1.58), new THREE.Vector3(0, 5, -1.58)
    ])
    ringGeos.push(crossGeo)
    scene.add(new THREE.LineSegments(crossGeo, ringMat))

    var material = new THREE.MeshPhysicalMaterial({ color: color('#dcab45'), metalness: 1, roughness: 0.2, clearcoat: 0.25, clearcoatRoughness: 0.12, envMapIntensity: 1.4, side: THREE.DoubleSide })
    var rosette = buildRosette(THREE, material, { segments: touch ? 110 : 180, leaves: 18, pearls: 64 })
    rosette.group.rotation.x = Math.PI / 2
    var pivot = new THREE.Group()
    pivot.add(rosette.group)
    scene.add(pivot)

    scene.add(new THREE.HemisphereLight(0xfff1d6, 0x05070d, 0.55))
    var key = new THREE.SpotLight(0xfff2dc, 160, 0, Math.PI / 6, 0.55, 2)
    key.position.set(-3.5, 4.2, 6.5)
    key.castShadow = true
    key.shadow.mapSize.set(touch ? 1024 : 2048, touch ? 1024 : 2048)
    key.shadow.bias = -0.0003
    key.shadow.normalBias = 0.02
    key.shadow.camera.near = 2
    key.shadow.camera.far = 20
    scene.add(key)
    scene.add(key.target)
    var rim = new THREE.PointLight(0xffa83a, 22, 0, 2)
    scene.add(rim)
    var fill = new THREE.DirectionalLight(0x9fb6ff, 0.6)
    fill.position.set(5, -2, 4)
    scene.add(fill)

    var dust = createGoldDust(THREE, touch ? 120 : 220, new THREE.Vector3(8, 6, 4), renderer.getPixelRatio(), 30)
    scene.add(dust.points)

    // Drag-to-rotate with inertia
    var ctrl = { dragging: false, lastX: 0, lastY: 0, vx: 0, vy: 0, rx: 0.22, ry: -0.42, crx: 0.22, cry: -0.42, idle: 0, hoverX: 0, hoverY: 0 }
    on(container, 'pointerdown', function (e) {
      ctrl.dragging = true
      ctrl.lastX = e.clientX
      ctrl.lastY = e.clientY
      ctrl.idle = 0
      try { container.setPointerCapture(e.pointerId) } catch (err) { /* capture unsupported */ }
    })
    on(container, 'pointermove', function (e) {
      var r = container.getBoundingClientRect()
      ctrl.hoverX = ((e.clientX - r.left) / r.width) * 2 - 1
      ctrl.hoverY = -(((e.clientY - r.top) / r.height) * 2 - 1)
      if (!ctrl.dragging) return
      var dx = e.clientX - ctrl.lastX
      var dy = e.clientY - ctrl.lastY
      ctrl.lastX = e.clientX
      ctrl.lastY = e.clientY
      ctrl.vy = dx * 0.0065
      ctrl.vx = dy * 0.005
      ctrl.ry += ctrl.vy
      ctrl.rx += ctrl.vx
      ctrl.idle = 0
    })
    var endDrag = function () { ctrl.dragging = false }
    on(container, 'pointerup', endDrag)
    on(container, 'pointercancel', endDrag)
    on(container, 'lostpointercapture', endDrag)

    // Scroll-scrubbed assembly: parts fly together as the section reaches centre
    var explode = { cur: pendingExplode ? 1 : 0, scroll: 0, manual: pendingExplode ? 1 : 0 }
    var spin = { base: 0, intro: 0 }
    var section = container.closest('section') || container
    if (deps.ScrollTrigger && !reduced) {
      var st = deps.ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress
          var eased = 1 - p * p * (3 - 2 * p)
          explode.scroll = eased
          spin.intro = -eased * 2.4
        }
      })
      cleanups.push(function () { st.kill() })
    }

    applyFinish(material, pendingFinish, true)
    ringMat.opacity = pendingFinish === 'blueprint' ? 0.45 : 0.12

    function resize() {
      var w = container.clientWidth
      var h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camBase = camera.aspect < 1 ? 8.4 : 6.6
      camera.updateProjectionMatrix()
    }
    var ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    var t0 = performance.now()
    var last = t0
    var loop = createLoop(container, function () {
      var now = performance.now()
      var dt = Math.min(0.05, (now - last) / 1000)
      var t = (now - t0) / 1000
      last = now

      if (!ctrl.dragging) {
        ctrl.ry += ctrl.vy
        ctrl.rx += ctrl.vx
        ctrl.vy *= 0.93
        ctrl.vx *= 0.93
        ctrl.idle += dt
        if (ctrl.idle > 2.5) {
          ctrl.ry += Math.sin(t * 0.25) * 0.0022
          ctrl.rx = lerp(ctrl.rx, 0.22 + Math.sin(t * 0.3) * 0.08, 0.01)
        }
      }
      ctrl.rx = clamp(ctrl.rx, -0.75, 0.75)
      if (ctrl.ry > 1.15) { ctrl.ry = lerp(ctrl.ry, 1.15, 0.15); ctrl.vy *= 0.5 }
      else if (ctrl.ry < -1.15) { ctrl.ry = lerp(ctrl.ry, -1.15, 0.15); ctrl.vy *= 0.5 }
      ctrl.crx = lerp(ctrl.crx, ctrl.rx, 0.12)
      ctrl.cry = lerp(ctrl.cry, ctrl.ry, 0.12)

      var target = Math.max(explode.scroll, explode.manual)
      explode.cur = lerp(explode.cur, target, 0.08)
      rosette.parts.forEach(function (p) { p.mesh.position.y = p.base + p.offset * explode.cur })

      pivot.rotation.set(ctrl.crx + explode.cur * 0.35, ctrl.cry, 0)
      spin.base += dt * 0.12
      rosette.group.rotation.y = spin.base + spin.intro

      camera.position.z = camBase + explode.cur * 1.1
      key.position.x = lerp(key.position.x, -3.5 + ctrl.hoverX * 2.5, 0.05)
      key.position.y = lerp(key.position.y, 4.2 + ctrl.hoverY * 1.5, 0.05)
      rim.position.set(Math.cos(t * 0.7) * 2.6, Math.sin(t * 0.7) * 2.6, 1.6)
      dust.uniforms.uTime.value = t

      renderer.render(scene, camera)
    })

    return {
      setFinish: function (k) {
        applyFinish(material, k, false)
        if (gsap && !reduced) {
          gsap.to(ringMat, { opacity: k === 'blueprint' ? 0.45 : 0.12, duration: 0.8 })
          gsap.fromTo(pivot.scale, { x: 0.93, y: 0.93, z: 0.93 }, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'elastic.out(1, 0.5)' })
        } else {
          ringMat.opacity = k === 'blueprint' ? 0.45 : 0.12
        }
      },
      setExplode: function (v) { explode.manual = v ? 1 : 0 },
      dispose: function () {
        loop.dispose()
        ro.disconnect()
        rosette.dispose()
        material.dispose()
        backdropGeo.dispose()
        backdropMat.dispose()
        ringMat.dispose()
        ringGeos.forEach(function (g) { g.dispose() })
        dust.dispose()
        if (scene.environment) scene.environment.dispose()
        renderer.dispose()
        canvas.remove()
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Lenis inertial smooth scroll (synced with GSAP ticker)
  // ---------------------------------------------------------------------------
  function setupLenis() {
    var Lenis = deps.Lenis
    if (!Lenis || reduced) return
    var lenis = new Lenis({ duration: 1.25, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)) }, smoothWheel: true })
    window.__mvLenis = lenis
    if (deps.gsap && deps.ScrollTrigger) {
      lenis.on('scroll', deps.ScrollTrigger.update)
      var tick = function (time) { lenis.raf(time * 1000) }
      deps.gsap.ticker.add(tick)
      deps.gsap.ticker.lagSmoothing(0)
      cleanups.push(function () { deps.gsap.ticker.remove(tick) })
    } else {
      var id = 0
      var loop = function (time) { lenis.raf(time); id = requestAnimationFrame(loop) }
      id = requestAnimationFrame(loop)
      cleanups.push(function () { cancelAnimationFrame(id) })
    }
    cleanups.push(function () { lenis.destroy(); window.__mvLenis = null })
  }

  // ---------------------------------------------------------------------------
  // GSAP ScrollTrigger choreography
  // ---------------------------------------------------------------------------
  function setupScrollChoreography() {
    var gsap = deps.gsap
    var ST = deps.ScrollTrigger
    if (!gsap || !ST || reduced) return

    gsapCtx = gsap.context(function () {
      // Hero content drifts up & dims as the WebGL stage takes over
      var heroInner = document.querySelector('#accueil > .max-w-7xl')
      if (heroInner) {
        gsap.to(heroInner, { yPercent: -10, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '#accueil', start: 'top top', end: 'bottom top', scrub: true } })
      }

      // 3D flip-up section headings
      gsap.utils.toArray('section:not(#accueil) h2').forEach(function (h) {
        gsap.fromTo(h,
          { rotationX: -80, y: 70, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%' },
          { rotationX: 0, y: 0, opacity: 1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })

      // Perspective "lift" of every content grid, scrubbed with scroll
      gsap.utils.toArray('section:not(#accueil) > div > .grid').forEach(function (g) {
        gsap.fromTo(g,
          { rotationX: 14, y: 110, scale: 0.95, transformPerspective: 1600, transformOrigin: '50% 0%' },
          { rotationX: 0, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: g, start: 'top 98%', end: 'top 50%', scrub: 1.2 } })
      })

      // Cinematic clip-path reveals
      var portrait = document.querySelector('#apropos .aspect-\\[4\\/5\\]')
      if (portrait) {
        gsap.fromTo(portrait, { clipPath: 'inset(100% 0% 0% 0% round 16px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: '#apropos', start: 'top 70%' } })
      }
      var slider = document.querySelector('#avant-apres [data-interactive]')
      if (slider) {
        gsap.fromTo(slider, { clipPath: 'inset(0% 50% 0% 50% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: slider, start: 'top 80%' } })
      }
      var stageEl = document.getElementById('atelier-webgl')
      if (stageEl && stageEl.parentElement) {
        gsap.fromTo(stageEl.parentElement, { clipPath: 'inset(12% 12% 12% 12% round 48px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none', scrollTrigger: { trigger: stageEl.parentElement, start: 'top 95%', end: 'top 35%', scrub: 1 } })
      }

      // Velocity-reactive marquee (skew + speed + direction follow the scroll)
      var skewEl = document.querySelector('#mv-marquee .mv-marquee-skew')
      var track = document.querySelector('#mv-marquee .mv-marquee-track')
      if (skewEl && track) {
        var anim = track.getAnimations ? track.getAnimations()[0] : null
        var rate = { v: 1 }
        var skewTo = gsap.quickTo(skewEl, 'skewX', { duration: 0.5, ease: 'power3' })
        var rateTo = gsap.quickTo(rate, 'v', { duration: 0.6, ease: 'power3', onUpdate: function () { if (anim) anim.playbackRate = rate.v } })
        var resetTimer = 0
        ST.create({
          onUpdate: function (self) {
            var v = self.getVelocity()
            skewTo(clamp(-v / 250, -12, 12))
            rateTo(clamp(1 + v / 600, -4, 6))
            clearTimeout(resetTimer)
            resetTimer = setTimeout(function () { skewTo(0); rateTo(1) }, 140)
          }
        })
      }
    })

    on(window, 'load', function () { ST.refresh() })
  }

  // ---------------------------------------------------------------------------
  // Magnetic CTAs
  // ---------------------------------------------------------------------------
  function setupMagnetic() {
    var gsap = deps.gsap
    if (!gsap) return
    var els = document.querySelectorAll('[data-magnetic], #accueil .lg\\:col-span-7 button, #contact a.rounded-full, header button.rounded-full')
    Array.prototype.forEach.call(els, function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      on(el, 'mousemove', function (e) {
        var r = el.getBoundingClientRect()
        xTo((e.clientX - r.left - r.width / 2) * 0.35)
        yTo((e.clientY - r.top - r.height / 2) * 0.45)
      })
      on(el, 'mouseleave', function () { xTo(0); yTo(0) })
    })
  }

  // ---------------------------------------------------------------------------
  // Gold-dust cursor trail (2D canvas, screen blended)
  // ---------------------------------------------------------------------------
  function setupGoldDust() {
    var c = document.createElement('canvas')
    c.setAttribute('aria-hidden', 'true')
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:89;mix-blend-mode:screen'
    document.body.appendChild(c)
    var ctx = c.getContext('2d')
    var dpr = Math.min(window.devicePixelRatio || 1, 2)
    var parts = []
    var last = null
    var raf = 0
    function size() { c.width = window.innerWidth * dpr; c.height = window.innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    size()
    on(window, 'resize', size)
    on(window, 'mousemove', function (e) {
      var x = e.clientX
      var y = e.clientY
      var n = last ? Math.min(6, Math.ceil(Math.hypot(x - last.x, y - last.y) / 10)) : 1
      for (var i = 0; i < n; i++) {
        var k = n > 1 ? i / n : 0
        parts.push({
          x: last ? last.x + (x - last.x) * k : x,
          y: last ? last.y + (y - last.y) * k : y,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.6 + 0.2,
          life: 1,
          r: Math.random() * 1.8 + 0.6
        })
      }
      last = { x: x, y: y }
      if (parts.length > 260) parts.splice(0, parts.length - 260)
    }, { passive: true })
    function loop() {
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!parts.length) return
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.015
        p.life -= 0.022
        if (p.life <= 0) { parts.splice(i, 1); continue }
        ctx.globalAlpha = p.life * 0.9
        ctx.fillStyle = p.life > 0.6 ? '#fde68a' : '#f59e0b'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life + 0.3, 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(loop)
    cleanups.push(function () { cancelAnimationFrame(raf); c.remove() })
  }

  // ---------------------------------------------------------------------------
  // Cinematic preloader + hero intro timeline
  // ---------------------------------------------------------------------------
  function heroIntro() {
    var gsap = deps && deps.gsap
    if (!gsap || reduced) return
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    var h1 = document.querySelector('#accueil h1')
    if (h1) tl.fromTo(h1, { rotationX: -70, y: 90, opacity: 0, transformPerspective: 1000, transformOrigin: '50% 100%' }, { rotationX: 0, y: 0, opacity: 1, duration: 1.7 }, 0)
    var copy = document.querySelectorAll('#accueil .lg\\:col-span-7 > *:not(h1)')
    if (copy.length) tl.fromTo(copy, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.09 }, 0.25)
    var showcase = document.querySelector('#accueil .lg\\:col-span-5')
    if (showcase) tl.fromTo(showcase, { opacity: 0, scale: 0.82, rotationY: -28, transformPerspective: 1400 }, { opacity: 1, scale: 1, rotationY: 0, duration: 2, clearProps: 'transform' }, 0.15)
    var zones = document.querySelectorAll('#accueil .mt-16 .grid > div')
    if (zones.length) tl.fromTo(zones, { y: 30, opacity: 0, rotationX: -40, transformPerspective: 800 }, { y: 0, opacity: 1, rotationX: 0, duration: 1.1, stagger: 0.07 }, 0.8)
    if (hero && hero.intro) {
      var hi = hero.intro()
      if (hi) tl.add(hi, 0)
    }
  }

  function runPreloader() {
    var el = document.getElementById('mv-preloader')
    var gsap = deps.gsap
    if (!el) { heroIntro(); return }
    if (!gsap || reduced) { el.dataset.done = '1'; el.remove(); return }
    if (window.__mvLenis) window.__mvLenis.stop()

    var bar = document.getElementById('mv-preloader-bar')
    var count = document.getElementById('mv-preloader-count')
    var state = { p: 0 }
    var started = performance.now()
    var finished = false
    function render() {
      var v = Math.round(state.p)
      if (bar) bar.style.width = v + '%'
      if (count) count.textContent = ('00' + v).slice(-3)
    }
    gsap.to(state, { p: 86, duration: 1.6, ease: 'power2.out', onUpdate: render })

    function reveal() {
      el.dataset.done = '1'
      el.style.pointerEvents = 'none'
      if (window.__mvLenis) window.__mvLenis.start()
      var tl = gsap.timeline({ onComplete: function () { el.remove(); refresh() } })
      tl.to(el.querySelector('.mv-preloader-inner'), { opacity: 0, y: -24, scale: 0.97, filter: 'blur(6px)', duration: 0.6, ease: 'power3.in' })
        .to(el.querySelector('.mv-curtain-top'), { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '-=0.15')
        .to(el.querySelector('.mv-curtain-bottom'), { yPercent: 100, duration: 1.15, ease: 'expo.inOut' }, '<')
        .add(heroIntro, '<0.3')
    }
    function complete() {
      if (finished) return
      finished = true
      var wait = Math.max(0, 1.6 - (performance.now() - started) / 1000)
      gsap.to(state, { p: 100, duration: 0.55, delay: wait, ease: 'power2.inOut', overwrite: true, onUpdate: render, onComplete: reveal })
    }
    if (document.readyState === 'complete') complete()
    else {
      on(window, 'load', complete)
      var timer = setTimeout(complete, 3800)
      cleanups.push(function () { clearTimeout(timer) })
    }
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  function refresh() {
    if (deps && deps.ScrollTrigger) deps.ScrollTrigger.refresh()
  }

  function setFinish(key) {
    pendingFinish = key
    if (atelier) atelier.setFinish(key)
  }

  function setExplode(value) {
    pendingExplode = !!value
    if (atelier) atelier.setExplode(pendingExplode)
  }

  function init(opts) {
    if (deps) return api
    opts = opts || {}
    deps = {
      THREE: opts.THREE || root.THREE,
      gsap: opts.gsap || root.gsap,
      ScrollTrigger: opts.ScrollTrigger || root.ScrollTrigger,
      Lenis: opts.Lenis || root.Lenis
    }
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (deps.gsap && deps.ScrollTrigger) deps.gsap.registerPlugin(deps.ScrollTrigger)

    setupLenis()
    if (deps.THREE) {
      try { hero = createHeroScene(document.getElementById('hero-webgl')) } catch (e) { console.warn('[LuxuryMotion] hero WebGL unavailable:', e) }
      try { atelier = createAtelierScene(document.getElementById('atelier-webgl')) } catch (e) { console.warn('[LuxuryMotion] atelier WebGL unavailable:', e) }
    }
    setupScrollChoreography()
    if (!isTouchDevice() && !reduced) {
      setupMagnetic()
      setupGoldDust()
    }
    runPreloader()
    return api
  }

  function destroy() {
    if (gsapCtx) { gsapCtx.revert(); gsapCtx = null }
    if (hero) { hero.dispose(); hero = null }
    if (atelier) { atelier.dispose(); atelier = null }
    while (cleanups.length) {
      try { cleanups.pop()() } catch (e) { /* already disposed */ }
    }
    deps = null
  }

  var api = { init: init, destroy: destroy, refresh: refresh, setFinish: setFinish, setExplode: setExplode }
  return api
})
