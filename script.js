const galleryItems = document.querySelectorAll(".shu");

const lightbox = document.createElement("div");

lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(15, 15, 35, 0.65);
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 10000;
    padding: 30px;
`;

lightbox.innerHTML = `
    <button id="closeBtn" style="
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
    ">&times;</button>

    <img id="previewImg" style="
        max-width: 90%;
        max-height: 75vh;
        object-fit: contain;
        border-radius: 12px;
    ">

    <h2 id="artistName" style="
        color: white;
        margin-top: 20px;
        font-family: monospace;
    "></h2>

    <a id="imageSource" target="_blank" rel="noopener noreferrer" style="
        color: #ddd;
        margin-top: 10px;
        font-family: monospace;
    ">Image Source</a>
`;

document.body.appendChild(lightbox);

const previewImg = document.getElementById("previewImg");
const artistName = document.getElementById("artistName");
const imageSource = document.getElementById("imageSource");
const closeBtn = document.getElementById("closeBtn");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const image = item.dataset.image;
        const artist = item.dataset.artist;
        const source = item.dataset.source;

        previewImg.src = image;
        artistName.textContent = artist;

        if (
            item.classList.contains("med") ||
            image.toLowerCase().includes("shu last")
        ) {
            imageSource.style.display = "none";
        } else {
            imageSource.href = source;
            imageSource.style.display = "block";
        }

        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});