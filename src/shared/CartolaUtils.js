export async function resizePhotoFromUrl(size = "140x140", photoUrl) {
  let resizedPhotoUrl = "";
  try {
    resizedPhotoUrl = photoUrl.replace("FORMATO", "140x140");
  } catch (error) {
    console.error(error);
  }
  return resizedPhotoUrl;
}
