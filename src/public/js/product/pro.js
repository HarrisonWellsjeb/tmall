import "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.0/jquery.min.js";
import Banner from "./banner.js";
import BigGlass from "./bigglass.js";
import Swap from "./swap.js";
import Select from "./select.js";
import Price from "./price.js";
import Number from "./number.js";

const banner = new Banner($(".showbanner"));
const bigglass = new BigGlass($(".showbig"));
const swap = new Swap($(".custion__custing"));
const select = new Select($(".custion__custing"));
const price = new Price($("#price"));
const num = new Number($("#change-number"));
