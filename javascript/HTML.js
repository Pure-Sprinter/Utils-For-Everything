/**
 * display 상태 반대로 변경하는 함수
 */
export function display_target({ id }) {
  const element = document.getElementById(id);
  const after_status = display_status[element.style.display];
  element.style.display = after_status;
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
  const element = document.getElementById(id);
  element.style.display = "block";
  return false;
}

/**
 * 개체 숨기기 함수
 */
export function disappear_target(id) {
  const element = document.getElementById(id);
  element.style.display = "none";
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
 * 개체 클릭 이벤트 정하는 함수
 */
export function set_element_click_event({ id, listener }) {
  const target = document.getElementById(id);
  target.addEventListener("click", listener);
}

/**
 * id 를 기반으로 텍스트를 설정
 */
export function set_text_by_id({ id, text }) {
  const target = document.getElementById(id);
  target.innerText = text;
  return text;
}

/**
 * input value를 정의하는 함수
 */
export function set_input_text({ id, text }) {
  const target = document.getElementById(id);
  target.value = text;
  return text;
}

/**
 * id 를 기반으로 HTML를 설정
 */
export function set_html_by_id({ id, html }) {
  const target = document.getElementById(id);
  target.innerHTML = html;
  return html;
}

/**
 * id 를 기반으로 img/src를 설정
 */
export function set_img_src_by_id({ id, src }) {
  const target = document.getElementById(id);
  target.src = src;
  return src;
}

/**
 * id 기반으로 이벤트를 집어넣는 설정
 */
export function set_add_event_by_id({ id, listener }) {
  const target = document.getElementById(id);
  target.addEventListener("click", listener);
  return false;
}
