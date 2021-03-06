const createLoaderPhoto = () => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  const fileChooserAvatar = document.querySelector('#avatar');
  const fileChooserImg = document.querySelector('#images');
  const previewAvatar = document.querySelector('.ad-form-header__preview img');
  const previewImg = document.querySelector('.ad-form__photo');
  const parentContainer = document.querySelector('.ad-form__photo-container');

  fileChooserAvatar.addEventListener('change', () => {
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });


  fileChooserImg.addEventListener('change', () => {
    const file = fileChooserImg.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if(previewImg){
        previewImg.remove();
      }
      const imgContainer = document.createElement('div');
      const img = document.createElement('img');
      imgContainer.classList.add('ad-form__photo');
      img.src = URL.createObjectURL(file);
      img.width = 70;
      img.height = 70;
      img.alt = 'Фото жилья';
      imgContainer.append(img);
      parentContainer.append(imgContainer);
    }
  });
};

export { createLoaderPhoto };
