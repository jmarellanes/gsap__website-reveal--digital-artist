import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function centerHeadingGap() {
  const word1 = document.querySelector(".heading-item-1");
  const word2 = document.querySelector(".heading-item-2");

  const w1 = word1.getBoundingClientRect().width;
  const w2 = word2.getBoundingClientRect().width;

  const shiftAmount = (w2 - w1) / 2;

  gsap.set(heading, {
    x: shiftAmount,
    xPercent: -50,
  });
}

const items = [
  { title: "1. Lorem ipsum", type: "Client", img: "./src/assets/images/image-1.webp" },
  { title: "2. Ipsum Lorem", type: "Client", img: "./src/assets/images/image-1.webp" },
  { title: "3. Ipsum Lorem", type: "Client", img: "./src/assets/images/image-1.webp", main: true },
  { title: "4. Lorem Ipsum", type: "Personal", img: "./src/assets/images/image-1.webp" },
  { title: "5. Lorem Ipsum", type: "Personal", img: "./src/assets/images/image-1.webp" },
  { title: "6. Lorem Ipsum", type: "Personal", img: "./src/assets/images/image-1.webp" },
];

const header = document.querySelector(".site-nav");
const itemsWrapper = document.querySelector(".items");
const heading = document.querySelector(".heading");
const textWrapper = document.querySelectorAll(".heading-item");
const centerPosition = { position: "fixed", top: "50%", left: "50%", xPercent: -50, yPercent: -50 };

if (header) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const height = entry.borderBoxSize[0].blockSize;

      document.documentElement.style.setProperty("--height-header", `${height}px`);
    }
  });

  observer.observe(header);
}

if (itemsWrapper) {
  const array = [];

  items.forEach((item) => {
    const itm = `
    <article class="item" ${item?.main ? "data-main" : ""}>
      <header class="item-copy">
        <div class="item-copy-wrapper">
          <p>${item.title}</p>
        </div>
        <div class="item-copy-wrapper">
          <p>${item.type}</p>
        </div>
      </header>

      <div class="item-container">
        <figure class="item-img">
          <img src="${item.img}" alt="" />
        </figure>
      </div>
    </article>
    `;

    array.push(itm);
  });

  itemsWrapper.innerHTML = array.join("");
};

if (textWrapper.length > 0) {
  textWrapper.forEach((word, index) => {
    const text = word.textContent.trim();
    word.innerHTML = "";

    text.split(" ").forEach((word) => {
      const wordSpan = document.createElement("p");
      wordSpan.classList.add("heading-title");

      wordSpan.innerHTML = word
        .split("")
        .map((char) => {
          return `<span class='letter'>${char}</span>`;
        })
        .join("");

      textWrapper[index].appendChild(wordSpan);
    });
  });
}

const itemMain = document.querySelector(".item[data-main]");
const itemMainWrapper = itemMain.querySelector(".item-container");
const itemMainImage = itemMain.querySelector("img");

gsap.set(heading, { ...centerPosition, scale: 0.4 });
gsap.set(itemMainWrapper, { ...centerPosition, width: "360px" });
gsap.set(".item:not([data-main]) .item-img", {
  clipPath: "inset(0% 0% 100% 0%)",
});
gsap.set(".item-copy", { y: -50, opacity: 0 });
gsap.set(header, { opacity: 0 });

centerHeadingGap();

gsap.defaults({ duration: 1, ease: "power3.out" });
const tl = gsap.timeline({ pause: true });

tl.from(".letter", {
  yPercent: 100,
  stagger: 0.05,
})

  .add("letterMove")
  .to(".heading-item-1", {
    x: "-16rem",
  }, "letterMove")
  .to(
    ".heading-item-2",
    {
      x: "16rem",
    },
    "letterMove",
  )
  .fromTo(
    itemMainImage,
    {
      clipPath: "inset(50% 50% 50% 50%)",
      scale: 0.5,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    "letterMove",
  )

  .add("contentToPosition")
  .add(() => {
    const state = Flip.getState(itemMainWrapper);
    gsap.set(itemMainWrapper, { clearProps: "all" });

    Flip.from(state, {
      ease: "power3.inOut",
      absolute: true,
    });
  }, "contentToPosition")

  .to(itemMainImage, {
    scale: 1,
    ease: "power3.inOut",
  }, "contentToPosition")

  .add(() => {
    const targets = [heading, ".heading-item-1", ".heading-item-2"];
    const state = Flip.getState(targets);
    gsap.set(targets, { clearProps: "all" });

    Flip.from(state, {
      ease: "power3.inOut",
      scale: true,
      absolute: true,
    });
  }, "contentToPosition")

  .to(".item:not([data-main]) .item-img", {
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: 0.1,
  }, "contentToPosition+=0.2")

  .to(
    ".item-copy",
    { y: 0, opacity: 1, stagger: 0.05 },
    "contentToPosition+=0.2",
  )

  .to(header, {
    opacity: 1,
  }, "contentToPosition+=0.6");
