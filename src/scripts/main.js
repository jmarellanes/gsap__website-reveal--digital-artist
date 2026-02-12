import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const items = [
  { title: "Shelby Cobra", type: "[427 V8 Muscle]", img: "./src/assets/images/image-1.webp" },
  { title: "Ferrari Testarossa", type: "[Flat-12 Legend]", img: "./src/assets/images/image-2.webp" },
  { title: "Ferrari F40", type: "[Twin-Turbo Icon]", img: "./src/assets/images/image-3.webp", main: true },
  { title: "Porshe 911", type: "[Rear-Engine Precision]", img: "./src/assets/images/image-4.webp" },
  { title: "Audi R8", type: "[V10 Quattro]", img: "./src/assets/images/image-5.webp" },
  { title: "Lamborghini Diablo", type: "[V12 Brutality]", img: "./src/assets/images/image-6.webp" },
];
const header = document.querySelector(".site-nav");
const itemsWrapper = document.querySelector(".items");
const heading = document.querySelector(".heading");
const textWrapper = document.querySelectorAll(".heading-item");
const centerPosition = { position: "fixed", top: "50%", left: "50%", xPercent: -50, yPercent: -50 };

let shiftAmount = 0;

function centerHeadingGap() {
  const word1 = document.querySelector(".heading-item-1");
  const word2 = document.querySelector(".heading-item-2");

  const w1 = word1.getBoundingClientRect().width;
  const w2 = word2.getBoundingClientRect().width;

  shiftAmount = (w2 - w1) / 2;
}

function centerItem(container, item) {
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const itemCenter = itemRect.left + itemRect.width / 2;
  const containerCenter = containerRect.left + containerRect.width / 2;

  container.scrollLeft += itemCenter - containerCenter;
}

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
  itemsWrapper.scrollLeft = 0;
};

if (textWrapper.length > 0) {
  let maxChars = 0;

  textWrapper.forEach((word) => {
    const text = word.textContent.trim();

    text.split(" ").forEach((wrd) => {
      if (wrd.length > maxChars)
        maxChars = wrd.length;
    });
  });

  textWrapper.forEach((word, index) => {
    const text = word.textContent.trim();
    word.innerHTML = "";

    text.split(" ").forEach((wordText) => {
      const wordSpan = document.createElement("p");
      wordSpan.classList.add("heading-title");
      wordSpan.style.setProperty("--char-count", maxChars);

      wordSpan.innerHTML = wordText
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
  ease: "power3.inOut",
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
      x: -shiftAmount,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    "letterMove",
  )

  .add("contentToPosition")
  .call(() => {
    itemMain.classList.add("active");
  })

  .add(() => {
    const target = [itemMainWrapper];
    const state = Flip.getState(target);
    gsap.set(target, { clearProps: "all" });

    centerItem(itemsWrapper, itemMain);

    Flip.from(state, {
      ease: "power3.inOut",
      absolute: true,
    });
  }, "contentToPosition")

  .to(itemMainImage, {
    scale: 1,
    ease: "power3.inOut",
    x: 0,
    onComplete: () => {
      itemsWrapper.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          itemsWrapper.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }, { passive: false });
    },
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

document.addEventListener("click", () => tl.play());
