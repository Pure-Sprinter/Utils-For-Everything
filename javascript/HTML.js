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
  target.innerHTML = text;
  return text;
}
