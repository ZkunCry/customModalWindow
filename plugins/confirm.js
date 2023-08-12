$.confirmModal = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: `<span>${options.title}</span>`,
      closable: true,
      onClose: function () {
        modal.destroy();
      },
      content: options.content,
      width: `500px`,
      footer: [
        {
          text: "Отмена",
          type: "primary",
          handler() {
            modal.close();
            reject();
          },
        },
        {
          text: "Удалить",
          type: "primary",
          handler() {
            modal.close();
            resolve();
          },
        },
      ],
    });
    modal.open();
  });
};
