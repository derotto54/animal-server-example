const animalNameInput = document.getElementById('animal-name')
const animalTypeInput = document.getElementById('animal-type')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = {
    type: animalTypeInput.value,
    name: animalNameInput.value,
  }

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(text => alert(text))
  .catch(err => console.log(err))
})