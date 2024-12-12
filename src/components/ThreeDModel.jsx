'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function ThreeDModel() {
  const canvasRef = useRef()
  const [testModel, setTestModel] = useState(null)

  useEffect(() => {
    // صحنه
    const scene = new THREE.Scene()
    scene.background = null // حذف بک‌گراند

    // دوربین
    const camera = new THREE.PerspectiveCamera(
      75,
      700 / 600, // نسبت تصویر
      0.1,
      1000
    )
    camera.position.set(0, 0.5, 2.5) // موقعیت دوربین (نزدیک‌تر به مدل برای زوم بیشتر)
    camera.lookAt(0, 0, 0) // جهت دوربین

    // رندرر
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
      alpha: true, // فعال کردن شفافیت
    })
    renderer.setSize(700, 600) // اندازه رندرر
    renderer.setPixelRatio(window.devicePixelRatio)

    // نورپردازی
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    // بارگذاری مدل
    const loader = new GLTFLoader()
    let model

    setTestModel(model)

    // زاویه اولیه برای نمای دلخواه
    const initialRotation = {
      x: Math.PI / 8,
      y: -Math.PI / 2,
      z: -Math.PI / -9,
    } // تنظیم زاویه z برای نمای دقیق‌تر

    let isRotationDone = false // پرچم برای بررسی زمانی که چرخش تمام شده است
    let lastRotation = { x: 0, y: 0, z: 0 } // برای نگهداری آخرین وضعیت چرخش مدل

    loader.load(
      '/images/nike_air_zoom_pegasus_36.glb',
      (gltf) => {
        model = gltf.scene
        model.position.set(0, 0, 0) // موقعیت مدل
        model.rotation.set(
          initialRotation.x,
          initialRotation.y,
          initialRotation.z
        ) // تنظیم زاویه اولیه
        model.scale.set(2, 2, 2) // بزرگ‌تر کردن مدل (مقیاس 2 برابر)
        scene.add(model)

        // حرکت موس برای تغییر زاویه مدل
        const handleMouseMove = (event) => {
          if (model) {
            const { clientX, clientY } = event
            const xRotation = (clientY / window.innerHeight - 0.5) * 0.5
            const yRotation = (clientX / window.innerWidth - 0.5) * 0.5
            model.rotation.x = initialRotation.x + xRotation
            model.rotation.y = initialRotation.y + yRotation
            model.rotation.z = initialRotation.z // ثابت نگه داشتن Z برای حفظ حالت
          }
        }
        window.addEventListener('mousemove', handleMouseMove)

        // OrbitControls (اختیاری)
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = false // غیرفعال کردن زوم

        // تنظیم حداقل و حداکثر فاصله زوم
        controls.minDistance = 1.5 // حداقل فاصله زوم (برای جلوگیری از ورود به داخل مدل)
        controls.maxDistance = 5 // حداکثر فاصله زوم (برای جلوگیری از دور شدن بیش از حد مدل)
        // OrbitControls (no dragging or rotating)

        controls.enableRotate = false // Disable rotation entirely
        controls.enableZoom = false // Disable zooming
        controls.enablePan = false // Disable panning

        // حلقه رندر
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)

          // بررسی تغییر چرخش مدل و چاپ وضعیت در کنسول فقط زمانی که چرخش تغییر کند
          if (
            model.rotation.x !== lastRotation.x ||
            model.rotation.y !== lastRotation.y ||
            model.rotation.z !== lastRotation.z
          ) {
            lastRotation = {
              x: model.rotation.x,
              y: model.rotation.y,
              z: model.rotation.z,
            }
          }
        }
        animate() // تنها یکبار animate را صدا کنید
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // حرکت موس برای تغییر زاویه مدل
    // حرکت موس برای تغییر زاویه مدل
    // حرکت موس برای تغییر زاویه مدل (فقط چرخش عمودی)
    const handleMouseMove = (event) => {
      if (model) {
        const { clientX, clientY } = event

        // محاسبه چرخش عمودی (محور x)
        const xRotation = (clientY / window.innerHeight - 0.5) * 0.5 // حساسیت بیشتر در محور x

        // چرخش مدل فقط در محور x (حفظ محدودیت در محور y)
        model.rotation.x = initialRotation.x + xRotation

        // ثابت نگه داشتن محور y و z
        model.rotation.y = initialRotation.y
        model.rotation.z = initialRotation.z
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // تغییر اندازه صفحه
    const handleResize = () => {
      camera.aspect = 700 / 600
      camera.updateProjectionMatrix()
      renderer.setSize(700, 600)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const printRotation = () => {
    if (testModel) {
      console.log('Current Rotation:', testModel.rotation)
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: '700px',
          height: '600px',
          backgroundColor: 'transparent',
        }}
      />
    </>
  )
}
