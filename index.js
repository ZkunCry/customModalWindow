const options = {
  title: `<span>Модальние окно</span>
  <i class="fa fa-times close" aria-hidden="true"></i>`,
  closable: true,
  content: `<p>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
  Asperiores at iusto ducimus quibusdam facere consequatur impedit
  quaerat repudiandae, doloremque optio, quas blanditiis maxime
  debitis nobis veritatis itaque cupiditate excepturi mollitia
  dolorum deleniti aliquid illum corporis saepe? Aspernatur officiis
  animi nam aperiam 
  </p>`,
  width: `500px`,
};

const modal = $.modal(options);
