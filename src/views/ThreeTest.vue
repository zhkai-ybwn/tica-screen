<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-19 16:06:44
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-31 10:17:39
 * @FilePath: \tica-energy-plant\src\views\ThreeTest.vue
 * @Description: threeJs 3D 测试
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="container"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
    setup() {
        const container = ref(null)
        let scene, camera, renderer, mesh

        onMounted(() => {
            scene = new THREE.Scene()
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            camera.position.set(0, 0, 5)

            renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setSize(window.innerWidth, window.innerHeight)
            container.value.appendChild(renderer.domElement)

            const loader = new GLTFLoader()
            loader.load('../../models/lengshuijifang.glb', (gltf) => {
                mesh = gltf.scene
                scene.add(mesh)
            }, undefined, (error) => {
                console.error('Error loading the model:', error)
            })

            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(1, 1, 1)
            scene.add(light)
            const controls = new OrbitControls(camera, renderer.domElement)
            const animate = () => {
                requestAnimationFrame(animate)
                if (mesh) {
                }
                controls.update()
                renderer.render(scene, camera)
            }

            animate()
        })

        return { container }
    },
}
</script>

<style>
    /* You can style the container as needed */
    #container {
        width: 100%;
        height: 100vh;
    }
</style>
