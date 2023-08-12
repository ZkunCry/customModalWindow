function _createButton(buttons = []) {
  const $buttons = document.createElement("div");
  $buttons.classList.add("mmodal-footer");

  if (buttons.length === 0) {
    $buttons.insertAdjacentHTML(
      "afterbegin",
      `<button>OK</button>
      <button>CANCEL</button>`
    );
    return $buttons;
  }
  buttons.forEach((btn) => {
    const tempBtn = document.createElement("button");
    tempBtn.textContent = btn.text;
    tempBtn.classList = `btn btn-${btn.type}`;
    tempBtn.onclick = btn.handler || function () {};
    $buttons.appendChild(tempBtn);
  });

  return $buttons;
}

function template(options) {
  const DEAFULT_WIDTH = "600px";
  const modal = document.createElement("div");
  modal.options = options ?? {};
  console.log(modal.options);
  modal.classList.add("mmodal");

  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="mmodal-body" data-close="true">
      <div class="mmodal-content" style ="width:${
        modal.options.maxWidth || DEAFULT_WIDTH
      };">
        <div class="mmodal-header">
          <span>Модальние окно</span>
          ${
            modal.options.closable
              ? `<i class="fa fa-times close" data-close="true" aria-hidden="true"></i>`
              : ``
          }
        </div>
        <div class="mmodal-inner">
          ${modal.options.content || ``}
        </div>

      </div>
    </div>`
  );
  modal.querySelector(".mmodal-inner").after(_createButton(options.footer));
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  let modalWindow = template(options);
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) console.log("Modal window has been destroyed");
      modalWindow.classList.add("active");
    },

    close() {
      if (destroyed) console.log("Modal window has been destroyed");
      if (typeof options.onClose === "function") {
        options.onClose();
      }

      modalWindow.classList.remove("active");
    },
  };
  function listener(event) {
    console.log(event.target.dataset.close);
    if (event.target.dataset.close) {
      modal.close();
    }
  }
  modalWindow.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      modalWindow.parentNode.removeChild(modalWindow);
      modalWindow.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      modalWindow.querySelector(".mmodal-inner").innerHTML = html;
    },
    setTitle(html) {
      modalWindow.querySelector(".mmodal-header").innerHTML = html;
    },
    setFooter(html) {
      modalWindow.querySelector(".mmodal-footer").innerHTML = html;
    },
  });
};
