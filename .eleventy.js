const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const rss = require("@11ty/eleventy-plugin-rss");
const moment = require("moment");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(rss);

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addShortcode('copyrightYear', function() {
        const currentDate = moment.utc();

        const copyrightYear =
            currentDate.year() == 2020 ?
            "2020" :
            `2020 - ${currentDate.format('YYYY')}`;

        return `Copyright &#169; ${copyrightYear} David Gregory`;
    })

    return {
        dir: {
            layouts: "_layouts",
            output: "docs"
        }
    };
};