//! dom element get
const phoneSearchEl = document.getElementById('search-input');
const toggleEl = document.getElementById('spinner');
const allPhonesEl = document.getElementById('all-phones');
const singlePhoneEl = document.getElementById('single-phone');

//! toggle spinner
const toggleSpinner = (displayStyle) => {
    toggleEl.style.display = displayStyle;
}

//! clear area 
const clearArea = (value) => {
    if (value == 'onlyAll') {
        singlePhoneEl.innerHTML = '';
        allPhonesEl.innerHTML = '';
    } else {
        phoneSearchEl.value = '';
        singlePhoneEl.innerHTML = '';
        allPhonesEl.innerHTML = '';
    }
}

//! search phones
const searchPhones = async () => {
    toggleSpinner('block');
    const phoneSearch = phoneSearchEl.value;
    if (phoneSearch == '') {
        alert('Please enter something');
        clearArea();
        toggleSpinner('none');
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${phoneSearch}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.data.length > 0) {
            phoneSearchEl.value = '';
            displayPhones(data.data);
            toggleSpinner('none');
        } else {
            alert('No result found');
            clearArea();
            toggleSpinner('none');
        }
    }
}

//! display phones
const displayPhones = (data) => {
    clearArea('onlyAll');
    data.forEach(dt => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col text-center shadow rounded">
            <div class=" h-100">
            <img src="${dt.image}" class="card-img-top w-50 mx-auto" alt="..."  height='400px' />
            <div class="card-body">
                <h5 class="card-title">${dt.phone_name}</h5>
                <button class='btn btn-primary' onclick='searchPhone("${dt.slug}")'>View Details</button>
            </div>
            </div>
        </div> 
        `;
        allPhonesEl.appendChild(div);
    })

}

//! single phone search
const searchPhone = async (dt) => {
    const url = `https://openapi.programming-hero.com/api/phone/${dt}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

//! single phone display
const displayPhone = (dt) => {
    singlePhoneEl.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="col text-center border p-3 m-3 rounded shadow-lg">
            <div class="h-100">
            <img src="${dt.image}" class="card-img-top w-50 mx-auto" alt="..."  height='400px' />
            <div class="card-body">
            <h4 class="card-title">${dt.name}</h4>
            <small class="card-title mb-2">${dt.releaseDate}</small>
            <p class="card-title"><b>Storage:</b> ${dt.mainFeatures.storage}</p>
            <p class="card-title"><b>DisplaySize:</b> ${dt.mainFeatures.displaySize}</p>
            <p class="card-title"><b>ChipSet:</b> ${dt.mainFeatures.chipSet}</p>
            <p class="card-title"><b>Memory:</b> ${dt.mainFeatures.memory}</p>
            <p class="card-title"><b>More Features:</b> ${dt.mainFeatures.sensors[0] ? dt.mainFeatures.sensors[0] : ''}, ${dt.mainFeatures.sensors[1] ? dt.mainFeatures.sensors[1] : ''}, ${dt.mainFeatures.sensors[2] ? dt.mainFeatures.sensors[2] : ''}, ${dt.mainFeatures.sensors[3] ? dt.mainFeatures.sensors[3] : ''}, ${dt.mainFeatures.sensors[4] ? dt.mainFeatures.sensors[4] : ''}, ${dt.mainFeatures.sensors[5] ? dt.mainFeatures.sensors[5] : ''}, ${dt.mainFeatures.sensors[6] ? dt.mainFeatures.sensors[6] : ''} </p>
            <p class="card-title"><b>Brand:</b> ${dt.brand}</p>
            </div>
            </div>
        </div> 
        `;
    singlePhoneEl.appendChild(div);
}