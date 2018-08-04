var cafeList = document.getElementById('cafe-list');
var form = document.getElementById('add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

// Getting data
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
});


form.addEventListener('submit', (e) => {
    console.log("Hola");
    e.preventDefault();
    db.collection('cafes').add({
        name : form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});
