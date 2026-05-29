// ===== 首页脚本：左侧导航 + 页面切换 + 文章加载 =====

document.addEventListener('DOMContentLoaded', function () {
    // 板块配置：标签名 -> 中文名
    var sectionNames = {
        'work': 'My Work',
        'skills': "What I'm good at",
        'blog': 'Blog',
        'essay': '随笔'
    };

    // 从 postList.json 加载文章
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'postList.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var postList = JSON.parse(xhr.responseText);
            renderSections(postList);
        }
    };
    xhr.send();

    function renderSections(postList) {
        var container = document.getElementById('posts-container');
        if (!container) return;

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

    // 导航切换功能
    var navItems = document.querySelectorAll('.nav-item');
    var sections = document.querySelectorAll('.content-section');

    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // 移除所有 active 状态
            navItems.forEach(function (nav) {
                nav.classList.remove('active');
            });

            // 添加 active 状态到当前项
            this.classList.add('active');

            // 获取目标页面
            var targetPage = this.getAttribute('data-page');

            // 显示对应板块，隐藏其他
            sections.forEach(function (section) {
                section.style.display = 'none';
            });

            var targetSection = document.getElementById(targetPage + '-section');
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // URL hash 导航支持
    function handleHashChange() {
        var hash = window.location.hash.slice(1);
        if (hash) {
            navItems.forEach(function (item) {
                item.classList.remove('active');
                if (item.getAttribute('data-page') === hash) {
                    item.classList.add('active');
                }
            });
            sections.forEach(function (section) {
                section.style.display = 'none';
            });
            var targetSection = document.getElementById(hash + '-section');
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});

// Gmeek console 版权信息
console.log("\n %c Gmeek last https://github.com/Meekdai/Gmeek \n","padding:5px 0;background:#02d81d;color:#fff");