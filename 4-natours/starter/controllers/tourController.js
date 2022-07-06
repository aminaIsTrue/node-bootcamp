const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  // console.log(req);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
