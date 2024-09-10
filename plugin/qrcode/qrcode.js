const rgbToHyphen = (rgb) =>
  rgb
    .replace(/[^0-9, ]/g, "")
    .split(", ")
    .join("-")

const textColor = rgbToHyphen(
  getComputedStyle(document.documentElement).getPropertyValue("--r-main-color")
)
const bgColor = rgbToHyphen(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--r-background-color"
  )
)

const getQRCode = async (url) => {
  return fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&qzone=1&ecc=L&color=${textColor}&bgcolor=${bgColor}&data=${url}`
  ).then((res) => res.url)
}

const QRCodes = document.querySelectorAll('img[data-type="qrcode"]')

Array.from(QRCodes).forEach(async (el) => {
  el.src = await getQRCode(el.alt)
  el.onclick = () => {
    window.open(el.alt)
  }
})
