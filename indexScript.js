document.addEventListener('DOMContentLoaded', function () {
    var content = document.getElementById('content');
    var existingLayout = document.querySelector('.layout-wrapper');

    // ═══════════════════════════════════════════
    // Gmeek mode: create full layout from #content
    // ═══════════════════════════════════════════
    if (!existingLayout && content) {

        // ╔══════════════════════════════════════════════════════════════════╗
        // ║  【左侧边栏配置】修改头像、用户名、副标题请在这里修改           ║
        // ╚══════════════════════════════════════════════════════════════════╝
        var layoutWrapper = document.createElement('div');
        layoutWrapper.className = 'layout-wrapper';

        var leftSidebar = document.createElement('aside');
        leftSidebar.className = 'left-sidebar';
        leftSidebar.innerHTML =
            // ── 头像图片路径、用户名、副标题 ──
            '<div class="sidebar-header">' +
            '<img src="/images/hpp.jpg" alt="avatar" class="sidebar-avatar">' +
            '<h1 class="sidebar-title">tpTwof</h1>' +
            '<p class="sidebar-subtitle">Developer</p>' +
            '</div>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【导航菜单】修改菜单项请在这里修改                             ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<nav class="sidebar-nav">' +
            // ── About Me 菜单项 ──
            '<a href="#" class="nav-item active" data-page="about">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' +
            '<span>About Me</span></a>' +
            // ── Blog 菜单项 ──
            '<a href="#blog" class="nav-item" data-page="blog">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>' +
            '<span>Blog</span></a>' +
            // ── Skills 菜单项 ──
            '<a href="#skills" class="nav-item" data-page="skills">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>' +
            '<span>What I\'m good at</span></a>' +
            // ── My Work 菜单项 ──
            '<a href="#works" class="nav-item" data-page="works">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>' +
            '<span>My Work</span></a>' +
            // ── Contact Me 菜单项 ──
            '<a href="#contact" class="nav-item" data-page="contact">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
            '<span>Contact Me</span></a>' +
            '</nav>' +
            '<div class="sidebar-footer">' +
            '<div class="social-links">' +
            '<a href="#" class="social-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
            '<a href="#" class="social-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>' +
            '<a href="#" class="social-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></a>' +
            '<a href="https://github.com/tpTwof" target="_blank" class="social-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg></a>' +
            '<a href="https://tpTwof.github.io/rss.xml" target="_blank" class="social-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 5.17 17.6l-1.46-1.46a7.07 7.07 0 0 0-3.71-3.71V10.1z"/></svg></a>' +
            '</div>' +
            '<div class="sidebar-copyright"><p>Powered by <a href="https://meekdai.com/Gmeek.html" target="_blank">Gmeek</a></p></div>' +
            '</div>';

        var mainArea = document.createElement('main');
        mainArea.className = 'main-area';
        mainArea.innerHTML =
            '<div class="main-content-wrapper">' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【页面标题】每个页面的标题和副标题在 pageMeta 中配置            ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<div class="page-header">' +
            '<h1 class="page-title">About Me</h1>' +
            '<div class="title-underline"></div>' +
            '<p class="page-intro">Developer · Designer · Lifelong Learner</p>' +
            '</div>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【About Me 区域】修改个人介绍请在这里修改                      ║
            // ║  label="life" 的文章会自动显示在这个区域下方                    ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<section id="about-section" class="content-section">' +
            '<div class="about-content">' +
            '<div class="about-section"><h3>About Me</h3><p>热爱技术与设计，专注于Web开发、开源项目和个人成长。在这里分享我的学习笔记、项目经验和生活感悟。</p></div>' +
            '</div></section>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【Blog 区域】label="blog" 的文章会自动显示在这里              ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<section id="blog-section" class="content-section" style="display:none"></section>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【Skills 区域】修改技能列表请在这里修改                        ║
            // ║  直接修改下方的 skill-item 即可                                ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<section id="skills-section" class="content-section" style="display:none">' +
            '<div class="about-section"><h3>What I\'m good at</h3>' +
            '<div class="skills-grid">' +    
            '<span class="skill-item">JavaScript</span><span class="skill-item">TypeScript</span>' +
            '<span class="skill-item">React</span><span class="skill-item">Vue</span>' +
            '<span class="skill-item">Node.js</span><span class="skill-item">Python</span>' +
            '<span class="skill-item">Git</span><span class="skill-item">UI/UX</span>' +
            '</div></div></section>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【My Work 区域】label="works" 的文章会自动显示在这里          ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<section id="works-section" class="content-section" style="display:none"><div class="works-grid"></div></section>' +

            // ╔══════════════════════════════════════════════════════════════════╗
            // ║  【Contact Me 区域】修改联系表单请在这里修改                    ║
            // ╚══════════════════════════════════════════════════════════════════╝
            '<section id="contact-section" class="content-section" style="display:none">' +
            '<div class="contact-form">' +
            '<div class="form-group"><label class="form-label">Name</label><input type="text" class="form-input" placeholder="Your name"></div>' +
            '<div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" placeholder="your@email.com"></div>' +
            '<div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" placeholder="Your message..."></textarea></div>' +
            '<button type="submit" class="submit-btn">Send Message</button>' +
            '</div></section>' +
            '<section id="post-detail-section" class="content-section" style="display:none">' +
            '<button class="back-btn" id="back-btn">&larr; Back</button>' +
            '<div id="post-detail-content" class="post-detail-content"></div>' +
            '</section>' +
            '</div>';

        layoutWrapper.appendChild(leftSidebar);
        layoutWrapper.appendChild(mainArea);
        content.innerHTML = '';
        content.appendChild(layoutWrapper);
    }

    // ═══════════════════════════════════════════
    // Guard: layout must exist by now
    // ═══════════════════════════════════════════
    if (!document.querySelector('.layout-wrapper')) return;

    // ═══════════════════════════════════════════
    // Page state
    // ═══════════════════════════════════════════
    var currentPage = 'about';

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║  【页面标题配置】修改每个页面的标题和副标题请在这里修改          ║
    // ║  title = 页面大标题                                             ║
    // ║  intro = 页面副标题/描述                                        ║
    // ╚══════════════════════════════════════════════════════════════════╝
    var pageMeta = {
        'about': {
            title: 'About Me',
            intro: '我是tpTwof, 二年级本科生'
        },
        'blog': {
            title: 'Blog',
            intro: 'My thoughts, notes, and articles on technology and design.'
        },
        'skills': {
            title: "What I'm good at",
            intro: 'Technologies and tools I use to bring ideas to life.'
        },
        'works': {
            title: 'My Work',
            intro: 'Selected projects and open-source contributions.'
        },
        'contact': {
            title: 'Contact Me',
            intro: 'Have a question or want to work together? Reach out.'
        }
    };

    // ═══════════════════════════════════════════
    // DOM refs
    // ═══════════════════════════════════════════
    var navItems = document.querySelectorAll('.nav-item');
    var sections = document.querySelectorAll('.content-section');
    var pageTitle = document.querySelector('.page-title');
    var pageIntro = document.querySelector('.page-intro');
    var detailSection = document.getElementById('post-detail-section');
    var detailContent = document.getElementById('post-detail-content');

    // ═══════════════════════════════════════════
    // Navigation switching
    // ═══════════════════════════════════════════
    function switchToPage(page) {
        currentPage = page;
        navItems.forEach(function (n) { n.classList.remove('active'); });
        var activeNav = document.querySelector('.nav-item[data-page="' + page + '"]');
        if (activeNav) activeNav.classList.add('active');
        if (pageTitle && pageMeta[page]) pageTitle.textContent = pageMeta[page].title;
        if (pageIntro && pageMeta[page]) pageIntro.textContent = pageMeta[page].intro;
        sections.forEach(function (s) { s.style.display = 'none'; });
        if (detailSection) detailSection.style.display = 'none';
        var el = document.getElementById(page + '-section');
        if (el) el.style.display = 'block';
    }

    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            switchToPage(this.getAttribute('data-page'));
        });
    });

    // ═══════════════════════════════════════════
    // Back button
    // ═══════════════════════════════════════════
    var backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            switchToPage(currentPage === 'post' ? 'about' : currentPage);
        });
    }

    // ═══════════════════════════════════════════
    // Post click interception → load inline
    // ═══════════════════════════════════════════
    document.addEventListener('click', function (e) {
        var link = e.target.closest('.SideNav-item[data-post-url]');
        if (!link) return;
        e.preventDefault();
        loadPostDetail(
            link.getAttribute('data-post-url'),
            link.getAttribute('data-post-title'),
            link.getAttribute('data-post-date')
        );
    });

    function loadPostDetail(url, title, date) {
        currentPage = 'post';
        sections.forEach(function (s) { s.style.display = 'none'; });
        if (detailSection) detailSection.style.display = 'block';
        if (pageTitle) pageTitle.textContent = title || 'Post';
        if (pageIntro) pageIntro.textContent = date || '';
        navItems.forEach(function (n) { n.classList.remove('active'); });
        if (detailContent) detailContent.innerHTML = '<div class="post-loading">Loading...</div>';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (!detailContent) return;
            if (xhr.status !== 200) {
                detailContent.innerHTML = '<p class="post-error">Post not found (404). It may have been deleted.</p>';
                return;
            }
            try {
                var doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                var body = doc.getElementById('postBody');
                if (body) {
                    detailContent.innerHTML = '<div class="markdown-body">' + body.innerHTML + '</div>';
                } else {
                    detailContent.innerHTML = '<p class="post-error">Content not found.</p>';
                }
            } catch (e) {
                detailContent.innerHTML = '<p class="post-error">Failed to load content.</p>';
            }
        };
        xhr.onerror = function () {
            if (detailContent) detailContent.innerHTML = '<p class="post-error">Network error.</p>';
        };
        xhr.send();
    }

    // ═══════════════════════════════════════════
    // Load posts from postList.json
    // ═══════════════════════════════════════════
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'postList.json?_=' + Date.now(), true);
    xhr.onload = function () {
        if (xhr.status !== 200) return;
        try { renderSections(JSON.parse(xhr.responseText)); } catch (e) {}
    };
    xhr.send();

    function renderSections(data) {

        // ╔══════════════════════════════════════════════════════════════════╗
        // ║  【Label 映射配置】修改 Issue label 与页面板块的对应关系        ║
        // ║  格式: 'label名称': '目标section的id前缀'                      ║
        // ║  例如: 'life': 'about' 表示 label="life" 的文章显示在 About   ║
        // ╚══════════════════════════════════════════════════════════════════╝
        var labelMap = { 'blog': 'blog', 'works': 'works', 'life': 'about' };

        Object.keys(labelMap).forEach(function (tag) {
            var posts = [];
            Object.keys(data).forEach(function (key) {
                if (key === 'labelColorDict') return;
                var post = data[key];
                if (post.labels && post.labels.some(function (l) { return l.toLowerCase() === tag; })) {
                    posts.push(post);
                }
            });

            if (posts.length === 0) return;

            var targetId = labelMap[tag] + '-section';
            var target = document.getElementById(targetId);
            if (!target) return;

            var sectionDiv = document.createElement('div');
            sectionDiv.className = 'post-section';
            var sectionTitle = tag === 'life' ? 'Life' : 'Posts';
            sectionDiv.innerHTML = '<h2 class="section-title">' + sectionTitle + '</h2>';

            var listEl = document.createElement('div');
            listEl.className = 'SideNav';

            posts.forEach(function (post) {
                var item = document.createElement('a');
                item.href = post.postUrl;
                item.className = 'SideNav-item';
                item.setAttribute('data-post-url', post.postUrl);
                item.setAttribute('data-post-title', post.postTitle);
                item.setAttribute('data-post-date', post.createdDate);
                item.innerHTML = '<div class="post-item-content"><span class="listTitle">' +
                    post.postTitle + '</span><span class="LabelTime">' +
                    post.createdDate + '</span></div>';
                listEl.appendChild(item);
            });

            sectionDiv.appendChild(listEl);
            target.appendChild(sectionDiv);
        });
    }
});
