if (new URLSearchParams(document.location.search).get('override') !== '1') {
  init();
}

function init() {

  const target = window.document.documentElement;
    
  // create an observer instance
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const node = mutation.addedNodes[0] ?? mutation.target;
      if (node.tagName === 'SCRIPT') {
        if (node.src /* && !node.nextSibling */) {
          if (!node.getAttribute('safe-src')) {
            console.log(node.src, mutation.target);
            node.src = `https://crimson-smoke-85e2.arik-w801.workers.dev/check?script=${encodeURIComponent(node.src)}`;
            node.setAttribute('safe-src', '1');
          }
        }
      }
    });
  });

  // configuration of the observer:
  const config = {
    childList: true,
    subtree: true,
    attributeFilter: ['src']
  };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
}