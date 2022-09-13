/**
 * display 상태 반대로 변경하는 함수
 */
export function display_target({ id }) {
  const target = document.getElementById(id);
  if (target) {
    const after_status = display_status[target.style.display];
    target.style.display = after_status;
  }
  return false;
}

const display_status = {
  "": "block",
  block: "none",
  none: "block",
};

/**
 * 개체 숨기기 함수
 */
export function appear_target(id) {
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
  return false;
}

/**
 * 개체 숨기기 함수
 */
export function disappear_target(id) {
  const target = document.getElementById(id);
  if (target) target.style.display = "none";
  return false;
}

/**
 * 개체 색상 및 텍스트 정하는 함수
 */
export function set_element_text_and_color({ id, text, color }) {
  const target = document.getElementById(id);
  const before_text = target.innerText;
  target.innerText = text || before_text;
  target.style.color = color || target.style.color;
  return { id: id, text: before_text, color: color };
}

/**
 * id 를 기반으로 텍스트를 설정
 */
export function set_text_by_id({ id, text }) {
  const target = document.getElementById(id);
  if (target) target.innerText = text;
  return text;
}

/**
 * input value를 정의하는 함수
 */
export function set_input_text({ id, text }) {
  const target = document.getElementById(id);
  if (target) target.value = text;
  return text;
}

/**
 * id 를 기반으로 HTML를 설정
 */
export function set_html_by_id({ id, html }) {
  const target = document.getElementById(id);
  if (target) target.innerHTML = html;
  return html;
}

/**
 * id 를 기반으로 img/src를 설정
 */
export function set_img_src_by_id({ id, src }) {
  const target = document.querySelectorAll(id);
  if (target) target.forEach((element) => (element.src = src));
  return src;
}

/**
 * id 기반으로 이벤트를 집어넣는 설정
 */
export function set_add_event_by_id({ id, listener }) {
  const target = document.getElementById(id);
  if (target) target.addEventListener("click", listener);
  return false;
}

/**
 * 개체 배경색 정하는 함수
 */
export function set_element_background_color({ id, color }) {
  const target = document.getElementById(id);
  if (target) target.style.backgroundColor = color || target.style.backgroundColor;
  return { id: id, color: color };
}
