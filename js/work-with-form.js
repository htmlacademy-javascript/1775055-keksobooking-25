const form = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const minPriceHousing = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'span__error'
}, false);

const numberOfRoomsAndGuests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const typeOfHousing = form.querySelector('#type');

const price = form.querySelector('#price');

const roomNumber = form.querySelector('#room_number');

const capacity = form.querySelector('#capacity');

const timein = form.querySelector('#timein');

const timeout = form.querySelector('#timeout');

const sliderElement = document.querySelector('.ad-form__slider');

price.placeholder = minPriceHousing[typeOfHousing.value];

const activatorFormAndFilters = () => {
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('map__filters--disabled');
};

const inactiveFormAndFilters = () => {
  form.classList.add('ad-form--disabled');
  filters.classList.add('map__filters--disabled');
};

const validatePrice = (value) => value > minPriceHousing[typeOfHousing.value];

const onPriceChange = () => {
  price.placeholder = minPriceHousing[typeOfHousing.value];
  price.min = minPriceHousing[typeOfHousing.value];
  pristine.validate(price);
};

const priceValidatorErrorText = () => `минимальная цена ${minPriceHousing[typeOfHousing.value]}`;


const validateRoomsAndGuests = () => numberOfRoomsAndGuests[roomNumber.value].includes(capacity.value);

const getRoomsAndGuestsErrorMessage = () => {
  if (roomNumber.value === '1') {
    return '1&nbsp;комната — «для 1 гостя»';
  }
  else if (roomNumber.value === '2') {
    return '2&nbsp;комнаты — «для 2 гостей» или «для 1 гостя»';
  }
  else if (roomNumber.value === '3') {
    return '3&nbsp;комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
  }

  return '100 комнат — «не для гостей»';
};

typeOfHousing.addEventListener('change', onPriceChange);

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

pristine.addValidator(
  price,
  validatePrice,
  priceValidatorErrorText
);

pristine.addValidator(capacity, validateRoomsAndGuests, getRoomsAndGuestsErrorMessage);

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(price.placeholder),
      max: 100000,
    },
    start: Number(price.placeholder),
    step: 200,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    price.value = sliderElement.noUiSlider.get();
  });

  typeOfHousing.addEventListener('change',()=> {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Number(price.placeholder),
        max: 100000
      },
      start: Number(price.placeholder),
    });
  });
};

export { activatorFormAndFilters, inactiveFormAndFilters, createSlider };
