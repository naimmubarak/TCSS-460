const express = require('express');
const app = express();
const port = 3000; 

// Serve static files from the public folder
app.use(express.static('test'));
app.use(express.json());

// Define routes for each HTML file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/bmi', (req, res) => {
    res.sendFile('bmi.html', { root: __dirname + '/public' });
});

app.post('/calculate-bmi', (req, res) => {
    const { weight, height, age, gender } = req.body;

    const heightInMeters = height * 0.0254;
    const weightInKilograms = weight * 0.453592;
    const bmi = weightInKilograms / (heightInMeters * heightInMeters);


    res.json({ bmi });
});

app.get('/idealweight', (req, res) => {
    res.sendFile('idealweight.html', { root: __dirname + '/public' });
});

app.post('/calculate-ideal-weight', (req, res) => {
    const { age, gender, height } = req.body;

    // Calculate Ideal Body Weight based on gender and age using Miller's formula (1983)
    let idealBodyWeight;
    if (gender === 'male') {
        idealBodyWeight = 56.2 + (1.41 * (height - 60));
    } else {
        idealBodyWeight = 53.1 + (1.36 * (height - 60));
    }

    res.json({ idealBodyWeight });
});



app.get('/caloriesburned', (req, res) => {
    res.sendFile('caloriesburned.html', { root: __dirname + '/public' });
});

app.post('/calculate-calories-burned', (req, res) => {
    const { age, gender, weight, duration } = req.body;

    let caloriesBurned;
    if (gender === 'male') {
        caloriesBurned = (3.5 * weight * duration) / 200;
    } else {
        caloriesBurned = (3.5 * weight * duration) / 200;
    }

    res.json({ caloriesBurned });
});


app.get('/bodyfat', (req, res) => {
    res.sendFile('bodyfat.html', { root: __dirname + '/public' });
});

app.post('/calculate-body-fat', (req, res) => {
    const { age, gender, height, weight, neck, waist } = req.body;

    let bodyFatPercentage;
    if (gender === 'male') {
        bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        bodyFatPercentage = 163.205 * Math.log10(waist + neck - height) - 97.684 * Math.log10(height) - 78.387;
    }

    res.json({ bodyFatPercentage });
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
