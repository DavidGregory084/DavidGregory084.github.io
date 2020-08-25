const moment = require('moment');

class Home {
    data() {
        return {
            title: "Home",
            layout: "main.njk"
        };
    }

    postsHtml(data, topic) {
        const postsForTopic = data.collections[topic.tag];

        return postsForTopic
            .sort((l, r) => {
                const leftTitle = l.data.title;
                const rightTitle = r.data.title;
                return leftTitle.localeCompare(rightTitle);
            })
            .map(post => {
                return `<li>
                    <a href="${post.data.page.url}">${post.data.title}</a>
                    (${moment(post.date).utc().format('YYYY/MM/DD')})
                </li>`;
            });
    }

    topicsHtml(data) {
        return data.topics.filter(topic => {
            const postsForTopic = data.collections[topic.tag];
            return postsForTopic && postsForTopic.length > 0;
        }).map(topic => {
            return `<li>
                <h4>${topic.name}</h4>
                <ol>${this.postsHtml(data, topic).join("\n")}</ol>
            </li>`;
        });
    }

    render(data) {
        const topics = this.topicsHtml(data);

        const topicsHtml = topics.length > 0 ?
            `<ol>${topics.join("\n")}</ol>` :
            `<p>Coming soon<p>`;

        return `
        <h3>
            Posts
            <a href="/feed.xml" aria-label="Atom feed" title="Atom feed">
                <i aria-hidden="true" class="fas fa-rss fa-xs"></i>
            </a>
        </h3>
        ${topicsHtml}`;
    }
}

module.exports = Home;