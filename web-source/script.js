// Password Strength Logic
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', function() {
    const val = this.value;
    let strength = 0;
    if(val.length > 5) strength += 20;
    if(val.length > 8) strength += 20;
    if(/[A-Z]/.test(val)) strength += 20;
    if(/[0-9]/.test(val)) strength += 20;
    if(/[^A-Za-z0-9]/.test(val)) strength += 20;

    strengthBar.style.width = strength + '%';
    
    if(val === '') {
        strengthText.textContent = 'Min 8 chars, 1 uppercase, 1 number';
        strengthBar.style.background = '#333';
    } else if(strength < 40) {
        strengthText.textContent = 'Weak';
        strengthBar.style.background = '#ff4757';
    } else if(strength < 80) {
        strengthText.textContent = 'Medium';
        strengthBar.style.background = '#ffa502';
    } else {
        strengthText.textContent = 'Strong';
        strengthBar.style.background = '#2ed573';
    }

    validateField('password');
});

// Country and State Logic
const countrySelect = document.getElementById('country');
const stateGroup = document.getElementById('state-group');
const stateSelect = document.getElementById('state');

countrySelect.addEventListener('change', function() {
    const country = this.value;
    stateSelect.innerHTML = '<option value="" disabled selected></option>';
    stateSelect.value = ''; // Reset selected value
    document.getElementById('city').innerHTML = '<option value="" disabled selected></option>';
    document.getElementById('city').value = ''; // Reset selected value
    
    const states = {
        us: [
            { value: 'ca', text: 'California' },
            { value: 'ny', text: 'New York' },
            { value: 'tx', text: 'Texas' },
            { value: 'fl', text: 'Florida' },
            { value: 'il', text: 'Illinois' },
            { value: 'pa', text: 'Pennsylvania' },
            { value: 'wa', text: 'Washington' },
            { value: 'ga', text: 'Georgia' },
            { value: 'az', text: 'Arizona' },
            { value: 'nc', text: 'North Carolina' }
        ],
        uk: [
            { value: 'eng', text: 'England' },
            { value: 'sco', text: 'Scotland' },
            { value: 'wal', text: 'Wales' },
            { value: 'nir', text: 'Northern Ireland' }
        ],
        ca: [
            { value: 'on', text: 'Ontario' },
            { value: 'qc', text: 'Quebec' },
            { value: 'bc', text: 'British Columbia' },
            { value: 'ab', text: 'Alberta' },
            { value: 'mb', text: 'Manitoba' },
            { value: 'sk', text: 'Saskatchewan' },
            { value: 'ns', text: 'Nova Scotia' },
            { value: 'nb', text: 'New Brunswick' }
        ],
        in: [
            { value: 'mh', text: 'Maharashtra' },
            { value: 'dl', text: 'Delhi' },
            { value: 'ka', text: 'Karnataka' },
            { value: 'tn', text: 'Tamil Nadu' },
            { value: 'up', text: 'Uttar Pradesh' },
            { value: 'gj', text: 'Gujarat' },
            { value: 'rj', text: 'Rajasthan' },
            { value: 'wb', text: 'West Bengal' },
            { value: 'pb', text: 'Punjab' },
            { value: 'hr', text: 'Haryana' }
        ],
        de: [
            { value: 'bw', text: 'Baden-Württemberg' },
            { value: 'by', text: 'Bavaria' },
            { value: 'nw', text: 'North Rhine-Westphalia' },
            { value: 'he', text: 'Hesse' },
            { value: 'ni', text: 'Lower Saxony' },
            { value: 'be', text: 'Berlin' },
            { value: 'rp', text: 'Rhineland-Palatinate' },
            { value: 'sl', text: 'Saarland' }
        ],
        au: [
            { value: 'nsw', text: 'New South Wales' },
            { value: 'vic', text: 'Victoria' },
            { value: 'qld', text: 'Queensland' },
            { value: 'wa', text: 'Western Australia' },
            { value: 'sa', text: 'South Australia' },
            { value: 'tas', text: 'Tasmania' },
            { value: 'nt', text: 'Northern Territory' },
            { value: 'act', text: 'Australian Capital Territory' }
        ],
        fr: [
            { value: 'idf', text: 'Île-de-France' },
            { value: 'pac', text: 'Provence-Alpes-Côte d\'Azur' },
            { value: 'ara', text: 'Auvergne-Rhône-Alpes' },
            { value: 'hdf', text: 'Hauts-de-France' },
            { value: 'nor', text: 'Normandy' },
            { value: 'bre', text: 'Brittany' },
            { value: 'occ', text: 'Occitanie' },
            { value: 'cvl', text: 'Centre-Val de Loire' }
        ],
        jp: [
            { value: 'tok', text: 'Tokyo' },
            { value: 'osk', text: 'Osaka' },
            { value: 'knt', text: 'Kanto' },
            { value: 'kns', text: 'Kansai' },
            { value: 'hkd', text: 'Hokkaido' },
            { value: 'ths', text: 'Tohoku' },
            { value: 'chg', text: 'Chugoku' },
            { value: 'kyu', text: 'Kyushu' }
        ]
    };
    
    if (states[country]) {
        states[country].forEach(state => {
            const option = document.createElement('option');
            option.value = state.value;
            option.textContent = state.text;
            stateSelect.appendChild(option);
        });
        stateGroup.style.display = 'block';
    } else {
        stateGroup.style.display = 'none';
    }
    validateField('country');
    checkFormValidity();
});

// State to City dynamic logic
stateSelect.addEventListener('change', function() {
    const state = this.value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    
    const cities = {
        // US
        ca: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Fresno', 'Long Beach'],
        ny: ['New York City', 'Buffalo', 'Albany', 'Rochester', 'Syracuse', 'Yonkers'],
        tx: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'],
        fl: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee', 'St. Petersburg'],
        il: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield'],
        pa: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton'],
        wa: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent'],
        ga: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens'],
        az: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Glendale', 'Scottsdale'],
        nc: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville'],
        // UK
        eng: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Sheffield'],
        sco: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness', 'Stirling'],
        wal: ['Cardiff', 'Swansea', 'Newport', 'Bangor', 'St Davids', 'Wrexham'],
        nir: ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Armagh', 'Antrim'],
        // Canada
        on: ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Kitchener', 'Windsor'],
        qc: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke'],
        bc: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Saanich', 'Kelowna'],
        ab: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat', 'Grande Prairie'],
        mb: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler'],
        sk: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Yorkton', 'Swift Current'],
        ns: ['Halifax', 'Sydney', 'Dartmouth', 'Truro', 'New Glasgow', 'Cape Breton'],
        nb: ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Riverview', 'Quispamsis'],
        // India
        mh: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur'],
        dl: ['New Delhi', 'Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
        ka: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga'],
        tn: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
        up: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Meerut', 'Varanasi'],
        gj: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
        rj: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
        wb: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Maheshtala'],
        pb: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
        hr: ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak'],
        // Germany
        bw: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Heidelberg', 'Ulm'],
        by: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Würzburg', 'Ingolstadt'],
        nw: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Duisburg', 'Bonn'],
        he: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt', 'Offenbach', 'Hanau'],
        ni: ['Hanover', 'Braunschweig', 'Osnabrück', 'Oldenburg', 'Wolfsburg', 'Göttingen'],
        be: ['Berlin', 'Charlottenburg', 'Mitte', 'Prenzlauer Berg', 'Kreuzberg', 'Friedrichshain'],
        rp: ['Mainz', 'Ludwigshafen', 'Koblenz', 'Trier', 'Kaiserslautern', 'Worms'],
        sl: ['Saarbrücken', 'Neunkirchen', 'Homburg', 'Völklingen', 'Sankt Ingbert', 'Saarlouis'],
        // Australia
        nsw: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast', 'Cobar', 'Dubbo'],
        vic: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton', 'Warrnambool'],
        qld: ['Brisbane', 'Gold Coast', 'Cairns', 'Townsville', 'Toowoomba', 'Mount Isa'],
        wa: ['Perth', 'Fremantle', 'Mandurah', 'Bunbury', 'Kalgoorlie', 'Broome'],
        sa: ['Adelaide', 'Mount Isa', 'Whyalla', 'Port Augusta', 'Ceduna', 'Kimba'],
        tas: ['Hobart', 'Launceston', 'Devonport', 'Burnie', 'Ulverstone', 'Kingston'],
        nt: ['Darwin', 'Palmerston', 'Alice Springs', 'Katherine', 'Tennant Creek', 'Nhulunbuy'],
        act: ['Canberra', 'Belconnen', 'Civic', 'Gungahlin', 'Tuggeranong', 'Woden'],
        // France
        idf: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Argenteuil', 'Montreuil', 'Nanterre'],
        pac: ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Cannes'],
        ara: ['Lyon', 'Saint-Étienne', 'Grenoble', 'Villeurbanne', 'Clermont-Ferrand', 'Valence'],
        hdf: ['Lille', 'Roubaix', 'Tourcoing', 'Dunkerque', 'Villeneuve-d\'Ascq', 'Valenciennes'],
        nor: ['Rouen', 'Le Havre', 'Caen', 'Cherbourg', 'Évreux', 'Dieppe'],
        bre: ['Rennes', 'Brest', 'Quimper', 'Lorient', 'Vannes', 'Saint-Malo'],
        occ: ['Toulouse', 'Montpellier', 'Nîmes', 'Perpignan', 'Béziers', 'Narbonne'],
        cvl: ['Orléans', 'Tours', 'Bourges', 'Blois', 'Chartres', 'Châteauroux'],
        // Japan
        tok: ['Tokyo', 'Yokohama', 'Kawasaki', 'Saitama', 'Chiba', 'Funabashi'],
        osk: ['Osaka', 'Sakai', 'Higashiosaka', 'Habikino', 'Neyagawa', 'Kashiwara'],
        knt: ['Chiba', 'Kanagawa', 'Saitama', 'Ibaraki', 'Tochigi', 'Gunma'],
        kns: ['Kyoto', 'Kobe', 'Nara', 'Wakayama', 'Himeji', 'Amagasaki'],
        hkd: ['Sapporo', 'Hakodate', 'Otaru', 'Asahikawa', 'Muroran', 'Obihiro'],
        ths: ['Sendai', 'Saitama', 'Chiba', 'Fukushima', 'Miyagi', 'Iwate'],
        chg: ['Hiroshima', 'Okayama', 'Yamaguchi', 'Tottori', 'Shimane', 'Kagawa'],
        kyu: ['Fukuoka', 'Kagoshima', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki']
    };
    
    if (cities[state]) {
        cities[state].forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase().replace(/\s+/g, '');
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
    validateField('state');
    validateField('city');
    checkFormValidity();
});

// Validation Logic
const form = document.getElementById('registrationForm');
const submitBtn = document.querySelector('.submit-btn');

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    let errorSpan;
    if (fieldId === 'firstname' || fieldId === 'lastname') {
        errorSpan = document.getElementById('nameError');
    } else {
        errorSpan = document.getElementById(fieldId + 'Error');
    }
    let isValid = true;
    let message = '';

    switch(fieldId) {
        case 'firstname':
        case 'lastname':
            const firstName = document.getElementById('firstname').value.trim();
            const lastName = document.getElementById('lastname').value.trim();
            if (!firstName || !lastName) {
                message = 'This field is required';
                isValid = false;
            } else if (firstName.length < 2 || lastName.length < 2) {
                message = 'Must be at least 2 characters';
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'temp-mail.org', 'throwaway.email', 'yopmail.com'];
            if (!field.value.trim()) {
                message = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(field.value)) {
                message = 'Please enter a valid email';
                isValid = false;
            } else if (disposableDomains.some(domain => field.value.toLowerCase().endsWith('@' + domain))) {
                message = 'Disposable email addresses are not allowed';
                isValid = false;
            }
            break;
        case 'phone':
            const country = document.getElementById('country').value;
            let phoneRegex;
            if (country === 'us') {
                phoneRegex = /^\+?1?\d{10}$/; // US: optional +1, 10 digits
            } else if (country === 'uk') {
                phoneRegex = /^\+?44?\d{10}$/; // UK: optional +44, 10 digits
            } else if (country === 'ca') {
                phoneRegex = /^\+?1?\d{10}$/; // Canada: similar to US
            } else if (country === 'in') {
                phoneRegex = /^\+?91?\d{10}$/; // India: optional +91, 10 digits
            } else if (country === 'de') {
                phoneRegex = /^\+?49?\d{10,11}$/; // Germany: optional +49, 10-11 digits
            } else if (country === 'au') {
                phoneRegex = /^\+?61?\d{9}$/; // Australia: optional +61, 9 digits
            } else if (country === 'fr') {
                phoneRegex = /^\+?33?\d{9}$/; // France: optional +33, 9 digits
            } else if (country === 'jp') {
                phoneRegex = /^\+?81?\d{10}$/; // Japan: optional +81, 10 digits
            } else {
                phoneRegex = /^\d{10,15}$/; // Fallback for other countries
            }
            if (!field.value.trim()) {
                message = 'Phone number is required';
                isValid = false;
            } else if (!phoneRegex.test(field.value.replace(/\s+/g, ''))) {
                message = 'Please enter a valid phone number for the selected country';
                isValid = false;
            }
            break;
        case 'dob':
            if (!field.value) {
                message = 'Date of birth is required';
                isValid = false;
            }
            break;
        case 'address':
            if (!field.value.trim()) {
                message = 'Address is required';
                isValid = false;
            }
            break;
        case 'country':
            if (!field.value) {
                message = 'Please select a country';
                isValid = false;
            }
            break;
        case 'state':
            if (stateGroup.style.display !== 'none' && !field.value) {
                message = 'Please select a state';
                isValid = false;
            }
            break;
        case 'city':
            if (!field.value) {
                message = 'Please select a city';
                isValid = false;
            }
            break;
        case 'zip':
            if (!field.value.trim()) {
                message = 'Zip code is required';
                isValid = false;
            }
            break;
        case 'password':
            if (!field.value) {
                message = 'Password is required';
                isValid = false;
            } else if (field.value.length < 8) {
                message = 'Password must be at least 8 characters';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(field.value)) {
                message = 'Password must contain uppercase, lowercase, and number';
                isValid = false;
            }
            break;
        case 'confirm_password':
            const pass = document.getElementById('password').value;
            if (!field.value) {
                message = 'Please confirm your password';
                isValid = false;
            } else if (field.value !== pass) {
                message = 'Passwords do not match';
                isValid = false;
            }
            // Add visual indicator for mismatch
            const confirmGroup = field.parentElement;
            if (!isValid && message === 'Passwords do not match') {
                confirmGroup.classList.add('mismatch');
            } else {
                confirmGroup.classList.remove('mismatch');
            }
            break;
    }

    if (isValid) {
        errorSpan.style.display = 'none';
        errorSpan.textContent = '';
    } else if (field.classList.contains('touched')) {
        errorSpan.style.display = 'block';
        errorSpan.textContent = message;
    }


    return isValid;
}

function checkFormValidity() {
    const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'dob', 'address', 'country', 'state', 'city', 'zip', 'password', 'confirm_password'];
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    const termsChecked = document.querySelector('.terms input').checked;
    const stateRequired = stateGroup.style.display !== 'none';

    let allValid = true;
    requiredFields.forEach(id => {
        if (!validateField(id)) allValid = false;
    });

    if (!genderSelected) {
        if(document.querySelector('.radio-group').classList.contains('touched')){
        document.getElementById('genderError').style.display = 'block';
        document.getElementById('genderError').textContent = 'Please select a gender';
        }
        allValid = false;
    } else {
        document.getElementById('genderError').style.display = 'none';
    }

    if (stateRequired && !document.getElementById('state').value) {
        allValid = false;
    }

    if (!termsChecked) {
        if(document.querySelector('.terms').classList.contains('touched')){
        document.getElementById('termsError').style.display = 'block';
        document.getElementById('termsError').textContent = 'You must agree to the terms';
        }
        allValid = false;
    } else {
        document.getElementById('termsError').style.display = 'none';
    }

    submitBtn.disabled = !allValid;
}

// Add event listeners to all fields
['firstname', 'lastname', 'email', 'phone', 'dob', 'address', 'country', 'state', 'city', 'zip', 'password', 'confirm_password'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('blur', () => {
    field.classList.add('touched');
    validateField(id);
    checkFormValidity();
});

    field.addEventListener('input', () => { 
        field.classList.add('touched');
        validateField(id); 
        checkFormValidity(); 
    });
});

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelector('.radio-group').classList.add('touched');
        document.getElementById('genderError').style.display = 'none';
        checkFormValidity();
    });
});

document.querySelector('.terms input').addEventListener('change', () => {
    document.querySelector('.terms').classList.add('touched');
    checkFormValidity();
});


// Add this after the existing event listeners for fields
document.getElementById('confirm_password').addEventListener('input', function() {
    const pass = document.getElementById('password').value;
    const confirm = this.value;
    const confirmGroup = this.parentElement;
    if (confirm === pass) {
        confirmGroup.classList.remove('mismatch');
    }
});

// Password Toggle Functionality
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm_password');
        const isVisible = passwordInput.type === 'text';
        
        passwordInput.type = isVisible ? 'password' : 'text';
        confirmInput.type = isVisible ? 'password' : 'text';
        
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Form Submit Logic
function handleSubmit(e) {
    e.preventDefault();
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    const btn = document.querySelector('.submit-btn');

    if (pass !== confirm) {
        // UI feedback already shown
        return;
    }

    btn.disabled = true; // Disable immediately to prevent rapid submissions

    // Simulate loading
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Success!';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
            // Reset or redirect here
            btn.innerHTML = originalText;
            btn.style.background = '';
            document.getElementById('registrationForm').reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Min 8 chars, 1 uppercase, 1 number';
            strengthBar.style.background = '#333';
            // Reset errors
            document.querySelectorAll('.error').forEach(span => {
                span.style.display = 'none';
            });
            // Reset dropdowns
            stateGroup.style.display = 'none';
            stateSelect.value = ''; // Ensure state is reset
            document.getElementById('city').innerHTML = '<option value="" disabled selected></option>';
            document.getElementById('city').value = ''; // Ensure city is reset
            // Reset password visibility
            document.getElementById('password').type = 'password';
            document.getElementById('confirm_password').type = 'password';
            document.querySelector('.toggle-password').classList.remove('fa-eye-slash');
            document.querySelector('.toggle-password').classList.add('fa-eye');
            // Reset mismatch styling
            document.querySelector('#confirm_password').parentElement.classList.remove('mismatch');
            btn.disabled = false; // Re-enable after reset
            checkFormValidity();
        }, 1000);
    }, 1500);
}
// 🔒 Ensure submit button is disabled on initial page load
document.addEventListener("DOMContentLoaded", () => {
    checkFormValidity();
});
