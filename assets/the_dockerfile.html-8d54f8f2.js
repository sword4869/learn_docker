import{_ as e,V as a,W as n,X as s}from"./framework-48406333.js";const d={},i=s(`<ul><li><a href="#1-dockerfile-format">1. Dockerfile Format</a><ul><li><a href="#11-syntax">1.1. syntax</a></li><li><a href="#12-from">1.2. FROM</a></li><li><a href="#13-workdir">1.3. WORKDIR</a></li><li><a href="#14-copy-and-add">1.4. COPY and ADD</a></li><li><a href="#15-run--cmd">1.5. RUN &amp;&amp; CMD</a><ul><li><a href="#151-run">1.5.1. RUN</a></li><li><a href="#152-cmd">1.5.2. CMD</a></li></ul></li><li><a href="#16-env">1.6. ENV</a></li><li><a href="#17-expose">1.7. EXPOSE</a></li></ul></li><li><a href="#2-%E7%94%A8dockerfile%E5%88%9B%E5%BB%BA%E9%95%9C%E5%83%8F">2. 用Dockerfile创建镜像</a><ul><li><a href="#21-build">2.1. build</a></li><li><a href="#22-context">2.2. Context</a></li></ul></li></ul><hr><h1 id="_1-dockerfile-format" tabindex="-1"><a class="header-anchor" href="#_1-dockerfile-format" aria-hidden="true">#</a> 1. Dockerfile Format</h1><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># syntax=docker/dockerfile:1</span>

<span class="token instruction"><span class="token keyword">FROM</span> node:12-alpine</span>
<span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache python2 g++ make</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>
<span class="token instruction"><span class="token keyword">RUN</span> yarn install --production</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;node&quot;</span>, <span class="token string">&quot;src/index.js&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-1-syntax" tabindex="-1"><a class="header-anchor" href="#_1-1-syntax" aria-hidden="true">#</a> 1.1. syntax</h2><p><code># syntax=docker/dockerfile:1</code>：</p><p>&#39;1&#39;，表示使用最新的Dockerfile语法。</p><h2 id="_1-2-from" tabindex="-1"><a class="header-anchor" href="#_1-2-from" aria-hidden="true">#</a> 1.2. FROM</h2><p><code>FROM &lt;image_name&gt;</code>:</p><p>使用的image。</p><h2 id="_1-3-workdir" tabindex="-1"><a class="header-anchor" href="#_1-3-workdir" aria-hidden="true">#</a> 1.3. WORKDIR</h2><p><code>WORKDIR /app</code>:</p><p>指定此命令后所有Docker命令的工作路径。这里在是在container内部的<code>/app</code>根目录下的app目录中。</p><p>docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。</p><h2 id="_1-4-copy-and-add" tabindex="-1"><a class="header-anchor" href="#_1-4-copy-and-add" aria-hidden="true">#</a> 1.4. COPY and ADD</h2><p><code>COPY . .</code>:</p><p>将本地文件拷贝到Docker中，这里上下文所在的本地文件复制到Docker的<code>WORKDIR</code>中。</p><p>需要注意的是，ADD 指令会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。</p><p>因此在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD。</p><h2 id="_1-5-run-cmd" tabindex="-1"><a class="header-anchor" href="#_1-5-run-cmd" aria-hidden="true">#</a> 1.5. RUN &amp;&amp; CMD</h2><p>RUN和CMD都是shell命令。 RUN在docker build时运行，CMD在docker run时运行。</p><p>格式：</p><ul><li><p>exec格式： <code>RUN/CMD [&quot;可执行文件&quot;, &quot;参数1&quot;, &quot;参数2&quot;]</code>。注意是<code>&quot;</code>，<code>&#39;</code>不行。</p></li><li><p>shell 格式： <code>RUN/CMD 可执行文件 参数1 参数2</code>。 如果使用 shell 格式的话，实际的命令会被包装为 <code>sh -c</code> 的参数的形式进行执行。比如，<code>RUN echo $HOME</code>就是<code>RUN [ &quot;sh&quot;, &quot;-c&quot;, &quot;echo $HOME&quot;]</code></p></li></ul><h3 id="_1-5-1-run" tabindex="-1"><a class="header-anchor" href="#_1-5-1-run" aria-hidden="true">#</a> 1.5.1. RUN</h3><blockquote><p>合并RUN</p></blockquote><p>Dockerfile 中每一个指令都会建立一层。 所以可以合并的RUN就合并:</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">RUN</span> yum -y install wget</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget -O redis.tar.gz <span class="token string">&quot;http://download.redis.io/releases/redis-5.0.3.tar.gz&quot;</span></span>
<span class="token instruction"><span class="token keyword">RUN</span> tar -xvf redis.tar.gz</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span> <span class="token punctuation">\\</span>
    <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> redis.tar.gz <span class="token string">&quot;http://download.redis.io/releases/redis-5.0.3.tar.gz&quot;</span> <span class="token punctuation">\\</span>
    <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> <span class="token parameter variable">-xvf</span> redis.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建3层镜像变成，只会创建1层镜像。</p><p>另一种 Heredoc 写法：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">RUN</span> &lt;&lt;EOF</span>
yum -y install wget
wget -O redis.tar.gz &quot;http://download.redis.io/releases/redis-5.0.3.tar.gz&quot;
tar -xvf redis.tar.gz
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>!!!info 注意：Heredoc需要docker使用BuildKit。</p><pre><code>\`没有开启BuildKit的样子，是这样的\` ---&gt; \`：
\`\`\`bash
$ sudo docker build -t test .
Sending build context to Docker daemon  4.096kB
Step 1/4 : FROM python:3.8-slim-buster
---&gt; 60abb4f18941
Step 2/4 : WORKDIR /app
\`\`\`
开启BuildKit的样子，是这样的\`=&gt;\`：
\`\`\`bash
$ sudo docker build -t test .
[+] Building 7.8s (10/12)
=&gt; [internal] load build definition from Dockerfile    0.0s
=&gt; =&gt; transferring dockerfile: 38B                     0.0s
=&gt; [internal] load .docke
\`\`\`

在build临时使用BuildKit就是
\`\`\`bash
$ sudo DOCKER_BUILDKIT=1 docker build -t test .
\`\`\`
长久使用就直接修改配置文件：
\`\`\`bash
$ sudo vim /etc/docker/daemon.json
{ &quot;features&quot;: { &quot;buildkit&quot;: true } }

$ sudo service restart docker
\`\`\`\`
</code></pre><blockquote><p>update缓存问题</p></blockquote><p>永远将 <code>RUN apt-get update</code> 和 <code>apt-get install</code> 组合成一条 RUN 声明，例如：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>RUN apt-get update &amp;&amp; apt-get install -y \\
        package-bar \\
        package-baz \\
        package-foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code>apt-get update</code> 放在一条单独的 RUN 声明中会导致缓存问题以及后续的 <code>apt-get install</code> 安装老版本。</p><p>比如，假设你有一个 Dockerfile 文件：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像后，所有的层都在 Docker 的缓存中。假设你后来又修改了其中的 apt-get install 添加了一个包：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker 发现修改后的 <code>RUN apt-get update</code> 指令和之前的完全一样。所以，这层<code>apt-get update</code> 不会执行，而是使用之前的缓存镜像。因为 <code>apt-get update</code> 没有运行，后面的 <code>apt-get install</code> 可能安装的是过时的 curl 和 nginx 版本。</p><blockquote><p>install放弃问题</p></blockquote><p><code>RUN apt-get update &amp;&amp; apt-get install python3-dev</code></p><p>结果报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Do you want to continue? [Y/n] Abort.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以加上yes，即<code>RUN apt-get update &amp;&amp; apt-get install python3-dev -y</code></p><h3 id="_1-5-2-cmd" tabindex="-1"><a class="header-anchor" href="#_1-5-2-cmd" aria-hidden="true">#</a> 1.5.2. CMD</h3><blockquote><p>作用</p></blockquote><p>CMD为启动的容器指定默认要运行的程序。一旦程序运行结束，容器也就结束。</p><p>!!!note 后台服务 错误写法，<code>CMD service nginx start</code>。出现问题，容器执行后就立即退出了。甚至在容器内去使用 systemctl 命令结果却发现根本执行不了。原因是，<code>service nginx start</code> 命令以后台守护进程形式启动 nginx 服务，而且 <code>CMD service nginx start</code> 会被理解为 <code>CMD [ &quot;sh&quot;, &quot;-c&quot;, &quot;service nginx start&quot;]</code>，因此主进程实际上是 sh，那么当命令结束后，sh 也就结束了，sh 作为主进程退出了，自然就会令容器退出。 正确的做法是直接执行 nginx 可执行文件，并且要求以前台形式运行。比如：<code>CMD [&quot;nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]</code></p><blockquote><p>最后一个</p></blockquote><p>注意：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。这就是为什么不能用CMD代替RUN。</p><h2 id="_1-6-env" tabindex="-1"><a class="header-anchor" href="#_1-6-env" aria-hidden="true">#</a> 1.6. ENV</h2><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>ENV &lt;key&gt; &lt;value&gt;
ENV &lt;key1&gt;=&lt;value1&gt; &lt;key2&gt;=&lt;value2&gt;...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例子：</p><ul><li>指定版本号</li></ul><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>ENV NODE_VERSION 7.2.0

RUN curl -SLO &quot;https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz&quot; \\
  &amp;&amp; curl -SLO &quot;https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>指定PATH</li></ul><p>例如使用 <code>ENV PATH /usr/local/nginx/bin:$PATH</code> 来确保 <code>CMD [&quot;nginx&quot;]</code> 能正确运行。</p><h2 id="_1-7-expose" tabindex="-1"><a class="header-anchor" href="#_1-7-expose" aria-hidden="true">#</a> 1.7. EXPOSE</h2><p>格式为 <code>EXPOSE &lt;端口1&gt; [&lt;端口2&gt;...]</code>。</p><ul><li>屁用没用</li></ul><p>要将 EXPOSE 和在运行时使用 <code>-p &lt;宿主端口&gt;:&lt;容器端口&gt;</code> 区分开来。EXPOSE 仅仅是声明容器打算使用什么端口而已，在容器运行时并不会因为这个声明应用就会开启这个端口的服务。而且，后者指定时可以覆盖前者声明的端口。</p><ul><li>随机映射时起作用</li></ul><p>另一个用处则是在运行时使用随机端口映射时，也就是 <code>docker run -P</code> 时，会自动随机映射 EXPOSE 的端口。</p><ul><li>对VSCode的Docker插件起作用</li></ul><p>会让其运行时选中指定的端口。</p><h1 id="_2-用dockerfile创建镜像" tabindex="-1"><a class="header-anchor" href="#_2-用dockerfile创建镜像" aria-hidden="true">#</a> 2. 用Dockerfile创建镜像</h1><h2 id="_2-1-build" tabindex="-1"><a class="header-anchor" href="#_2-1-build" aria-hidden="true">#</a> 2.1. build</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># docker build -t &lt;image name&gt; &lt;context&gt;</span>
$ <span class="token function">docker</span> image build <span class="token parameter variable">-t</span> python-dev <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>-t/--tag</code>:</li></ul><p>不能省略。set the name of our image.</p><p>!!! warning 重名镜像</p><pre><code>当你指定名字build镜像后，出现了\`test\`镜像。在不修改Dockerfile的情况下，我们再次build名为\`test\`的镜像，直接build好了，而且没有新的镜像生成。这没有问题。
\`\`\`bash
$ sudo docker build -t test .

$ sudo docker image ls
REPOSITORY   TAG               IMAGE ID       CREATED         SIZE
test         latest            492afcedda29   2 minutes ago   221MB
python       3.8-slim-buster   60abb4f18941   2 days ago      117MB

$ sudo docker build -t test .

$ sudo docker image ls
REPOSITORY   TAG               IMAGE ID       CREATED         SIZE
test         latest            492afcedda29   2 minutes ago   221MB
python       3.8-slim-buster   60abb4f18941   2 days ago      117MB
\`\`\`
但是，当你指定名字build镜像后，生成了\`test\`镜像，又在修改Dockerfile后，再次build名为\`test\`的镜像，确实成功build了新的名为\`test\`镜像，同时原来的镜像就会被挤掉名字。
\`\`\`bash
$ sudo docker build -t test .

$ sudo docker image ls
REPOSITORY   TAG               IMAGE ID       CREATED         SIZE
test         latest            492afcedda29   2 minutes ago   221MB
python       3.8-slim-buster   60abb4f18941   2 days ago      117MB

$ sudo docker build -t test .

$ sudo docker image ls
REPOSITORY   TAG               IMAGE ID       CREATED          SIZE
test         latest            1b18c6d41842   24 seconds ago   117MB
&lt;none&gt;       &lt;none&gt;            492afcedda29   5 minutes ago    221MB
python       3.8-slim-buster   60abb4f18941   2 days ago       117MB
\`\`\`

所以, 要删除原来的镜像后, 再build.
</code></pre><h2 id="_2-2-context" tabindex="-1"><a class="header-anchor" href="#_2-2-context" aria-hidden="true">#</a> 2.2. Context</h2><blockquote><p>指定上下文（Context），还是指定 Dockerfile 所在路径？</p></blockquote><p>如果在 Dockerfile 中这么写：</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>COPY ./package.json /app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这并不是要复制执行 docker build 命令所在的目录下的 package.json，也不是复制 Dockerfile 所在目录下的 package.json，而是复制 上下文（context） 目录下的 package.json。</p><p><code>.</code> 表示<strong>当前目录</strong>，而 Dockerfile 一般就在当前目录，因此不少初学者以为这个路径是在指定 Dockerfile 所在路径，这么理解其实是不准确的。</p><p>那么为什么会有人误以为 . 是指定 Dockerfile 所在目录呢？这是因为在默认情况下，如果不额外指定 Dockerfile 的话，会将上下文目录下的名为 Dockerfile 的文件作为 Dockerfile。而一般大家习惯性的会使用默认的文件名 Dockerfile，以及会将其置于镜像构建上下文目录中.</p><p>这只是默认行为，实际上 Dockerfile 的文件名并不要求必须为 Dockerfile，而且并不要求必须位于上下文目录中，比如可以用 <code>-f ../Dockerfile.php</code> 参数指定某个文件作为 Dockerfile。</p><blockquote><p>使用上下文的误区</p></blockquote><p>为什么 <code>COPY ../package.json /app</code> 或者 <code>COPY /opt/xxxx /app</code> 无法工作？</p><p>注意：docker build 命令会将<strong>该目录下的内容</strong>打包交给 Docker 引擎以帮助构建镜像，所以仅仅知道其下(<code>./</code>)，而不知道其上(<code>../</code>)其周围(<code>/opt</code>)。</p><p>所以这些路径已经超出了上下文的范围，Docker 引擎无法获得这些位置的文件。如果真的需要那些文件，应该将它们复制到上下文目录中去。</p>`,87),o=[i];function t(l,c){return a(),n("div",null,o)}const p=e(d,[["render",t],["__file","the_dockerfile.html.vue"]]);export{p as default};
