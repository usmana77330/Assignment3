let parentDiv = document.getElementById("result");
        let form = document.getElementById("form");
        let images = document.getElementsByTagName("img");
        let getLatestImg;
        let windowWidth = window.innerWidth;

        // Load images from localStorage on page load
        showImages();

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let reader = new FileReader();
            let file = document.getElementById("image").files[0];
            if (!file) return;
            let name = file.name;

            reader.readAsDataURL(file);
            reader.onload = () => {
                if (file && localStorage) {
                    localStorage.setItem(name, reader.result);
                    alert("Image stored in localStorage");
                    parentDiv.innerHTML = "";
                    showImages();
                } else {
                    alert("Image was not stored");
                }
            };
        });

        function showImages() {
            for (let i = 0; i < localStorage.length; i++) {
                let res = localStorage.getItem(localStorage.key(i));
                let image = new Image();
                image.src = res;
                parentDiv.appendChild(image);
            }

            Array.from(images).forEach((img, index) => {
                img.addEventListener("click", () => {
                    getLatestImg = index;
                    let imgUrl = img.getAttribute("src");
                    let container = document.body;
                    let newImageWindow = document.createElement("div");
                    container.appendChild(newImageWindow);
                    newImageWindow.setAttribute("class", "img-window");
                    newImageWindow.setAttribute("onclick", "closeImage()");

                    let newImg = document.createElement("img");
                    newImageWindow.appendChild(newImg);
                    newImg.setAttribute("src", imgUrl);
                    newImg.setAttribute("class", "current-img");

                    newImg.onload = function() {
                        let imgWidth = this.width;
                        let calcImgEdge = ((windowWidth - imgWidth) / 2) - 80;
                    };
                });
            });
        }

        function closeImage() {
            document.querySelector(".img-window").remove();
        }