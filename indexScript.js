// ===== 首页脚本：左侧导航 + 按标签分类的文章板块 =====
document.addEventListener('DOMContentLoaded', function () {
    var content = document.getElementById('content');
    if (!content) return;

    // 创建布局容器
    var layoutWrapper = document.createElement('div');
    layoutWrapper.className = 'layout-wrapper';

    // 创建左侧导航栏
    var leftSidebar = document.createElement('aside');
    leftSidebar.className = 'left-sidebar';
    leftSidebar.innerHTML = `
        <div class="sidebar-header">
            <img src="https://github.githubassets.com/favicons/favicon.svg" alt="avatar" class="sidebar-avatar">
            <h1 class="sidebar-title">tpTwof</h1>
            <p class="sidebar-subtitle">Developer</p>
        </div>
        <nav class="sidebar-nav">
            <a href="https://tpTwof.github.io/" class="nav-item active">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <span>首页</span>
            </a>
            <a href="https://tpTwof.github.io/tag.html" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                <span>归档</span>
            </a>
            <a href="https://github.com/tpTwof" target="_blank" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                <span>GitHub</span>
            </a>
            <a href="https://tpTwof.github.io/rss.xml" target="_blank" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 5.17 17.6l-1.46-1.46a7.07 7.07 0 0 0-3.71-3.71V10.1z"/></svg>
                <span>RSS</span>
            </a>
        </nav>
        <div class="sidebar-footer">
            <p class="sidebar-footer-text">Powered by Gmeek</p>
        </div>
    `;

    // 创建主内容区域
    var mainArea = document.createElement('div');
    mainArea.className = 'main-area';

    // 创建个人简介卡片
    var profile = document.createElement('div');
    profile.className = 'profile-section';
    profile.innerHTML = `
        <div class="profile-info">
            <h1 class="profile-name">tpTwof</h1>
            <p class="profile-bio">Developer · Designer · Lifelong Learner</p>
            <p class="profile-desc">热爱技术与设计，专注于Web开发、开源项目和个人成长。</p>
            <div class="profile-links">
                <a href="https://github.com/tpTwof" target="_blank">GitHub</a>
                <a href="https://tpTwof.github.io/rss.xml" target="_blank" class="secondary">RSS</a>
            </div>
        </div>
    `;
    mainArea.appendChild(profile);

    // 隐藏原始的文章列表
    var originalList = content.querySelector('.SideNav');
    if (originalList) {
        originalList.style.display = 'none';
    }

    // 创建文章区域容器
    var mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';

    // ===== 板块配置：标签名 -> 中文名 =====
    var sectionNames = {
        'work': 'My Work',
        'skills': 'What I\'m good at',
        'blog': 'Blog',
        'essay': '随笔',
        'tech': '技术',
        'note': '笔记'
    };

    // 从 postList.json 加载文章
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'postList.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var postList = JSON.parse(xhr.responseText);
            renderSections(postList, mainLayout);
        }
    };
    xhr.send();

    function renderSections(postList, container) {
        // 按标签分组
        var sections = {};
        postList.forEach(function (post) {
            if (post.labels && post.labels.length > 0) {
                post.labels.forEach(function (label) {
                    var tagName = label.name.toLowerCase();
                    if (!sections[tagName]) {
                        sections[tagName] = [];
                    }
                    sections[tagName].push(post);
                });
            }
        });

        // 渲染每个板块
        Object.keys(sections).forEach(function (tag) {
            var sectionTitle = sectionNames[tag] || tag;
            var sectionDiv = document.createElement('div');
            sectionDiv.className = 'post-section';
            sectionDiv.innerHTML = '<h2 class="section-title">' + sectionTitle + '</h2>';

            var postListEl = document.createElement('div');
            postListEl.className = 'SideNav';

            sections[tag].forEach(function (post) {
                var item = document.createElement('a');
                item.href = post.url;
                item.className = 'SideNav-item';
                item.innerHTML = `
                    <div class="post-item-content">
                        <span class="listTitle">${post.title}</span>
                        <div class="post-meta">
                            ${post.labels.map(function(l) {
                                return '<span class="Label" style="background-color:' + l.color + '20;color:' + l.color + '">' + l.name + '</span>';
                            }).join(' ')}
                            <span class="LabelTime">${post.date}</span>
                        </div>
                    </div>
                `;
                postListEl.appendChild(item);
            });

            sectionDiv.appendChild(postListEl);
            container.appendChild(sectionDiv);
        });
    }

    mainArea.appendChild(mainLayout);

    // 组装整体布局
    layoutWrapper.appendChild(leftSidebar);
    layoutWrapper.appendChild(mainArea);

    // 替换原始 content
    content.innerHTML = '';
    content.appendChild(layoutWrapper);

    // 高亮当前页面导航项
    var navItems = document.querySelectorAll('.nav-item');
    var currentPath = window.location.pathname;
    navItems.forEach(function (item) {
        var href = item.getAttribute('href');
        if (href && href !== '#') {
            if (currentPath.endsWith('/') && href.endsWith('/')) {
                item.classList.add('active');
            }
        }
    });
});