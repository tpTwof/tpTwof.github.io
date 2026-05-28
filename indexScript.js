// ===== 首页脚本：注入个人简介和侧边栏 =====
document.addEventListener('DOMContentLoaded', function () {
    var content = document.getElementById('content');
    if (!content) return;

    // ===== 个人简介卡片 =====
    var profile = document.createElement('div');
    profile.className = 'profile-section';
    profile.innerHTML = `
        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="avatar" class="profile-avatar">
        <div class="profile-info">
            <h1 class="profile-name">tpTwof</h1>
            <p class="profile-bio">Developer · Designer · Lifelong Learner</p>
            <p class="profile-desc">热爱技术与设计，专注于Web开发、开源项目和个人成长。在这里分享我的学习笔记、项目经验和生活感悟。</p>
            <div class="profile-links">
                <a href="https://github.com/tpTwof" target="_blank">GitHub</a>
                <a href="https://tpTwof.github.io/rss.xml" target="_blank" class="secondary">RSS</a>
            </div>
        </div>
    `;
    content.insertBefore(profile, content.firstChild);

    // ===== 文章列表 + 侧边栏布局 =====
    var list = content.querySelector('.SideNav');
    if (!list) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'main-layout';

    var main = document.createElement('div');
    main.className = 'main-content';

    var title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'Latest Posts';

    list.parentNode.insertBefore(wrapper, list);
    wrapper.appendChild(main);
    main.appendChild(title);
    main.appendChild(list);

    // ===== 侧边栏 =====
    var sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <!-- 关于我 -->
        <div class="sidebar-card">
            <h3>About Me</h3>
            <p>全栈开发者，热爱编程与设计。</p>
            <p>专注于构建优雅、高效的Web应用。</p>
            <p>坐标：中国</p>
        </div>

        <!-- 技能标签 -->
        <div class="sidebar-card">
            <h3>Skills</h3>
            <div class="sidebar-skills">
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>React</span>
                <span>Vue</span>
                <span>Node.js</span>
                <span>Python</span>
                <span>Git</span>
                <span>UI/UX</span>
            </div>
        </div>

        <!-- 快速链接 -->
        <div class="sidebar-card">
            <h3>Quick Links</h3>
            <div class="sidebar-links">
                <a href="https://github.com/tpTwof" target="_blank">GitHub Profile</a>
                <a href="https://tpTwof.github.io/tag.html">All Tags</a>
                <a href="https://tpTwof.github.io/rss.xml" target="_blank">RSS Feed</a>
            </div>
        </div>

        <!-- 联系方式 -->
        <div class="sidebar-card">
            <h3>Contact</h3>
            <p>邮箱：your-email@example.com</p>
            <p>Twitter：@your-handle</p>
        </div>
    `;
    wrapper.appendChild(sidebar);
});
