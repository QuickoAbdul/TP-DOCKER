<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const save = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: count.value })
    })
    if (response.ok) {
      alert('Valeur sauvegardée !')
    } else {
      alert('Erreur lors de la sauvegarde')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur de connexion au serveur')
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Compteur: {{ count }}</h1>
      <div class="buttons">
        <button @click="decrement">Moins</button>
        <button @click="increment">Plus</button>
      </div>
      <button class="save-btn" @click="save">Sauvegarder</button>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
}

.save-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
