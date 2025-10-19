function runCode() {
  const html = document.getElementById('htmlCode').value;
  const css = "<style>" + document.getElementById('cssCode').value + "</style>";
  const js = "<script>" + document.getElementById('jsCode').value + "<\/script>";
  
  const preview = document.getElementById('preview');
  preview.srcdoc = html + css + js;
}
