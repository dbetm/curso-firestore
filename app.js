var cafeList = document.getElementById('cafe-list');
var form = document.getElementById('add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}

// Getting data
db.collection('cafes').where('city', '==', 'Fresnillo').orderBy('name').get().then((snapshot) => {
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
