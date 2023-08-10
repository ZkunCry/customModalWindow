function template(options) {
  const modal = document.createElement("div");
  modal.options = options ?? {};
  console.log(modal.options);
  modal.classList.add("modal");

  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-body">
      <div class="modal-content">
        <div class="modal-header">
          <span>Модальние окно</span>
          ${
            modal.options.closable
              ? `<i class="fa fa-times close" aria-hidden="true"></i>`
              : ``
          }
        </div>
        <div class="modal-inner">
          ${modal.options.content}
        </div>
        <div class="modal-footer">
          <button>OK</button>
          <button>CANCEL</button>
        </div>
      </div>
    </div>`
  );
  let element = (modal.querySelector(".modal-content").style.maxWidth =
    modal.options.width);

  document.body.appendChild(modal);
  return modal;
}
function createEvents(modalWindow) {
  if (modalWindow.options.closable) {
    modalWindow.addEventListener("click", (event) => {
      console.log(event.target.closest(".close"));
      if (event.target.closest(".close")) {
        modal.close();
      }
    });
  }
}
$.modal = function (options) {
  let modalWindow = template(options);
  createEvents(modalWindow);
  return {
    open() {
      modalWindow.classList.add("active");
    },

    close() {
      modalWindow.classList.remove("active");
    },
    destroy() {},
  };
};
