(function () {
  const HQ = { n: 'Sharjah', sub: 'Samnan · HQ', lon: 55.4211, lat: 25.3463 };
  const CITIES = [
    { n: 'Abu Dhabi', lon: 54.3773, lat: 24.4539 },
    { n: 'Dubai', lon: 55.2708, lat: 25.2048 },
    HQ,
    { n: 'Ajman', lon: 55.5136, lat: 25.4052 },
    { n: 'Umm Al Quwain', lon: 55.5532, lat: 25.5647 },
    { n: 'Ras Al Khaimah', lon: 55.9762, lat: 25.8007 },
    { n: 'Fujairah', lon: 56.3265, lat: 25.1288 }
  ];
  const NEIGHBOURS = { '512': 'OMAN', '682': 'SAUDI ARABIA', '634': 'QATAR' };

  const ready = () => new Promise((res) => {
    const t = setInterval(() => { if (window.d3 && window.topojson) { clearInterval(t); res(); } }, 40);
  });
  let topoPromise = null;

  class UaeMap extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      this.style.display = 'block';
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>' +
        '@keyframes flow{to{stroke-dashoffset:-40}}' +
        '.route{animation:flow 3.2s linear infinite}' +
        'text{font-family:Jost,system-ui,sans-serif}' +
        '</style><div style="width:100%;height:100%"></div>';
      this._host = root.lastChild;
      this.draw();
      this._ro = new ResizeObserver(() => this.draw());
      this._ro.observe(this);
    }
    disconnectedCallback() { if (this._ro) this._ro.disconnect(); }

    async draw() {
      await ready();
      const d3 = window.d3;
      if (!topoPromise) topoPromise = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json');
      const topo = await topoPromise;
      const feats = window.topojson.feature(topo, topo.objects.countries).features;
      const uae = feats.find((f) => String(f.id) === '784');
      const others = feats.filter((f) => NEIGHBOURS[String(f.id)]);
      const w = this.clientWidth || 640, h = this.clientHeight || 420;
      if (!w || !h) return;

      const proj = d3.geoMercator().fitExtent([[w * 0.06, h * 0.15], [w * 0.6, h * 0.9]], uae);
      const path = d3.geoPath(proj);
      const uid = 'm' + Math.random().toString(36).slice(2, 7);

      this._host.innerHTML = '';
      const svg = d3.select(this._host).append('svg')
        .attr('width', w).attr('height', h).attr('viewBox', '0 0 ' + w + ' ' + h)
        .style('display', 'block');

      const defs = svg.append('defs');
      defs.append('linearGradient').attr('id', uid + 'land')
        .attr('x1', '0').attr('y1', '0').attr('x2', '0.35').attr('y2', '1')
        .call((gr) => {
          gr.append('stop').attr('offset', '0%').attr('stop-color', '#DCE7F5');
          gr.append('stop').attr('offset', '55%').attr('stop-color', '#C3D4EC');
          gr.append('stop').attr('offset', '100%').attr('stop-color', '#AEC5E3');
        });
      defs.append('radialGradient').attr('id', uid + 'sea')
        .attr('cx', '0.32').attr('cy', '0.3').attr('r', '0.85')
        .call((gr) => {
          gr.append('stop').attr('offset', '0%').attr('stop-color', '#FFFFFF');
          gr.append('stop').attr('offset', '100%').attr('stop-color', '#EAF0FA');
        });
      const f = defs.append('filter').attr('id', uid + 'lift')
        .attr('x', '-25%').attr('y', '-25%').attr('width', '150%').attr('height', '160%');
      f.append('feDropShadow').attr('dx', 0).attr('dy', 6).attr('stdDeviation', 7)
        .attr('flood-color', '#0F2E5C').attr('flood-opacity', 0.22);
      const halo = defs.append('filter').attr('id', uid + 'halo')
        .attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
      halo.append('feGaussianBlur').attr('stdDeviation', 3);

      svg.append('rect').attr('width', w).attr('height', h).attr('fill', 'url(#' + uid + 'sea)');

      // faint graticule as the technical underlay
      svg.append('path')
        .attr('d', path(d3.geoGraticule().stepMinor([0.5, 0.5]).stepMajor([2, 2])()))
        .attr('fill', 'none').attr('stroke', '#0F2E5C').attr('stroke-width', 0.4).attr('opacity', 0.1);

      // coastal halo: land silhouettes blurred into the water
      const landAll = svg.append('g').attr('filter', 'url(#' + uid + 'halo)').attr('opacity', 0.5);
      landAll.append('path').attr('d', path({ type: 'FeatureCollection', features: others.concat([uae]) }))
        .attr('fill', 'none').attr('stroke', '#B7C5DE').attr('stroke-width', 7);

      const nb = svg.append('g');
      nb.selectAll('path').data(others).join('path')
        .attr('d', path).attr('fill', '#F1F3F8').attr('stroke', '#DCE2ED').attr('stroke-width', 1);
      nb.selectAll('text').data(others.filter((d) => {
        const c = path.centroid(d);
        return c[0] > 60 && c[0] < w - 60 && c[1] > 20 && c[1] < h - 40;
      })).join('text')
        .attr('transform', (d) => 'translate(' + path.centroid(d) + ')')
        .attr('text-anchor', 'middle').attr('fill', '#AAB4C8')
        .attr('font-size', 10).attr('letter-spacing', '0.24em')
        .text((d) => NEIGHBOURS[String(d.id)]);

      const gl = svg.append('g').attr('filter', 'url(#' + uid + 'lift)');
      gl.append('path').attr('d', path(uae))
        .attr('fill', 'url(#' + uid + 'land)')
        .attr('stroke', '#0F2E5C').attr('stroke-width', 1.3).attr('stroke-linejoin', 'round');
      svg.append('path').attr('d', path(uae)).attr('fill', 'none')
        .attr('stroke', '#FFFFFF').attr('stroke-width', 0.7).attr('opacity', 0.5)
        .attr('transform', 'translate(0,-1.2)');

      const g = svg.append('g');
      const pts = CITIES.map((c) => ({ c: c, p: proj([c.lon, c.lat]) })).filter((d) => d.p);
      const hub = pts.find((d) => d.c === HQ).p;

      // delivery routes radiating from the Sharjah hub
      pts.forEach((d) => {
        if (d.c === HQ) return;
        const mx = (hub[0] + d.p[0]) / 2, my = (hub[1] + d.p[1]) / 2;
        const nx = -(d.p[1] - hub[1]), ny = d.p[0] - hub[0];
        const len = Math.hypot(nx, ny) || 1, bow = 0.16;
        g.append('path')
          .attr('class', 'route')
          .attr('d', 'M' + hub[0] + ',' + hub[1] + 'Q' + (mx + (nx / len) * len * bow) + ',' + (my + (ny / len) * len * bow) + ' ' + d.p[0] + ',' + d.p[1])
          .attr('fill', 'none').attr('stroke', '#4CA22F').attr('stroke-width', 1.1)
          .attr('stroke-dasharray', '4 6').attr('opacity', 0.65);
      });

      const stackX = Math.max.apply(null, pts.map((d) => d.p[0])) + 36;
      const stacked = pts.filter((d) => d.c.n !== 'Abu Dhabi').sort((a, b) => a.p[1] - b.p[1]);
      const yFor = {};
      let cy = stacked[0].p[1] - 16;
      stacked.forEach((d) => { yFor[d.c.n] = cy; cy += d.c === HQ ? 32 : 22; });

      pts.forEach((d) => {
        const p = d.p, isHQ = d.c === HQ;
        let lx, ly, anchor;
        if (d.c.n === 'Abu Dhabi') { lx = p[0] - 16; ly = p[1] + 4; anchor = 'end'; }
        else {
          lx = stackX; ly = yFor[d.c.n]; anchor = 'start';
          g.append('path')
            .attr('d', 'M' + p[0] + ',' + p[1] + 'L' + (stackX - 17) + ',' + (ly - 4) + 'h10')
            .attr('fill', 'none').attr('stroke', '#C2CBDC').attr('stroke-width', 0.9);
        }
        if (isHQ) {
          g.append('circle').attr('cx', p[0]).attr('cy', p[1]).attr('r', 12)
            .attr('fill', 'none').attr('stroke', '#4CA22F').attr('stroke-width', 0.8).attr('opacity', 0.45);
        }
        g.append('circle').attr('cx', p[0]).attr('cy', p[1]).attr('r', isHQ ? 7.5 : 6)
          .attr('fill', '#FFFFFF').attr('stroke', isHQ ? '#0F2E5C' : '#4CA22F').attr('stroke-width', 1.2);
        g.append('circle').attr('cx', p[0]).attr('cy', p[1]).attr('r', isHQ ? 4 : 2.9)
          .attr('fill', isHQ ? '#0F2E5C' : '#4CA22F');
        const t = g.append('text').attr('x', lx).attr('y', ly).attr('text-anchor', anchor)
          .attr('fill', isHQ ? '#0F2E5C' : '#2E3D57').attr('font-size', 11)
          .attr('font-weight', isHQ ? 500 : 400).attr('letter-spacing', '0.14em')
          .text(d.c.n.toUpperCase());
        if (isHQ) {
          t.append('tspan').attr('x', lx).attr('dy', 12)
            .attr('font-size', 8.5).attr('font-weight', 400).attr('letter-spacing', '0.18em')
            .attr('fill', '#5B79A6').text(d.c.sub.toUpperCase());
        }
      });

      // scale bar from the live projection
      const a = proj.invert([w * 0.1, h * 0.9]), b = proj.invert([w * 0.1 + 100, h * 0.9]);
      const kmPer100 = d3.geoDistance(a, b) * 6371;
      const nice = [25, 50, 100, 200].reduce((best, v) =>
        Math.abs(v / kmPer100 * 100 - 110) < Math.abs(best / kmPer100 * 100 - 110) ? v : best, 50);
      const barW = nice / kmPer100 * 100;
      const bx = w * 0.06, by = h - 42;
      const sc = svg.append('g').attr('opacity', 0.75);
      sc.append('path').attr('d', 'M' + bx + ',' + by + 'h' + barW + 'M' + bx + ',' + (by - 4) + 'v8M' + (bx + barW) + ',' + (by - 4) + 'v8')
        .attr('stroke', '#7C8AA0').attr('stroke-width', 1).attr('fill', 'none');
      sc.append('text').attr('x', bx).attr('y', by - 9).attr('font-size', 9)
        .attr('letter-spacing', '0.2em').attr('fill', '#7C8AA0').text('0 – ' + nice + ' KM');
    }
  }

  if (!customElements.get('uae-map')) customElements.define('uae-map', UaeMap);
})();
