import Vue from "vue";

Vue.filter("striptags", string => {
  string = string ? String(string) : "";
  return string.replace(/(<[^>]+?>)/gi, "");
});

Vue.filter("truncate", (string, maxLength = 24) => {
  string = string ? String(string) : "";
  return string.length > maxLength
    ? string.substr(0, maxLength - 3) + "..."
    : string;
});

Vue.filter("ucfirst", string => {
  string = string ? String(string) : "";
  return string.length > 0
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : "";
});

Vue.filter("uppercase", string => {
  string = string ? String(string) : "";
  return string.toUpperCase();
});
