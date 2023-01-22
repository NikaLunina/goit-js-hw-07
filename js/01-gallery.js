import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const imgList = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
              <a class="gallery__link" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                />
              </a>
            </div>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", imgList);

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") return;
  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeEsc);
        console.log("onShow", instance);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", closeEsc);
        console.log("onClose", instance);
      },
    }
  );

  instance.show();

  function closeEsc(item) {
    if (item.key === "Escape") {
      instance.close();
    }
  }
});

