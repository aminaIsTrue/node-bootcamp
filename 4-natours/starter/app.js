const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const { json } = require('express');
const app = express();
app.use(express.json());
// use a third party middleware
app.use(morgan('dev'));
// create our own middleware
app.use((req, res, next) => {
  console.log('Hello from my first created middleware💃 ');
  next();
});

// create an actual midleware to manipulate the request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
// app.get('/', (req, res) =>
//   res.status(200).json({ message: 'Hello from the server', app: 'Natours' })
// );

// app.post('/', (req, res) => res.send('you can Post to this endpoint'));
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// functions: routes handlers////////////
const getAllTours = (req, res) => {
  // console.log(req);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  console.log(req.requestTime);
  const id = req.params.id * 1;
  if (id >= tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID is not valid!',
    });
  }
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours: tour,
    },
  });
};
const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID is not valid!',
    });
  }
  const tour = tours.find((tour) => tour.id === id);
  tour.name = 'Amina';
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tours: tour,
    },
  });
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID is not valid!',
    });
  }
  const tour = tours.find((tour) => tour.id === id);
  res.status(204).json({
    status: 'success',
    // results: tours.length,
    data: null,
  });
};

// ///////////////////////////////////////
// 1- way for calling routes
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// 2- way for calling routes

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
