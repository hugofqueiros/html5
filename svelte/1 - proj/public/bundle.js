
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.shift()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            while (render_callbacks.length) {
                const callback = render_callbacks.pop();
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_render);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_render.forEach(add_render_callback);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_render } = component.$$;
        fragment.m(target, anchor);
        // onMount happens after the initial afterUpdate. Because
        // afterUpdate callbacks happen in reverse order (inner first)
        // we schedule onMount callbacks before afterUpdate callbacks
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_render.forEach(add_render_callback);
    }
    function destroy(component, detaching) {
        if (component.$$) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal: not_equal$$1,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_render: [],
            after_render: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_render);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                $$.fragment.l(children(options.target));
            }
            else {
                $$.fragment.c();
            }
            if (options.intro && component.$$.fragment.i)
                component.$$.fragment.i();
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy(this, true);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/ContactCard.svelte generated by Svelte v3.4.4 */

    const file = "src/ContactCard.svelte";

    function create_fragment(ctx) {
    	var div3, header, div0, img, t0, div1, h1, t1, t2, h2, t3, t4, div2, p, t5;

    	return {
    		c: function create() {
    			div3 = element("div");
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			t1 = text(ctx.userName);
    			t2 = space();
    			h2 = element("h2");
    			t3 = text(ctx.jobTitle);
    			t4 = space();
    			div2 = element("div");
    			p = element("p");
    			t5 = text(ctx.description);
    			img.src = ctx.userImage;
    			img.alt = ctx.userName;
    			img.className = "svelte-1h2r50w";
    			add_location(img, file, 70, 12, 1351);
    			div0.className = "thumb svelte-1h2r50w";
    			toggle_class(div0, "thumb-placeholder", !ctx.userImage);
    			add_location(div0, file, 69, 8, 1282);
    			h1.className = "svelte-1h2r50w";
    			add_location(h1, file, 73, 12, 1447);
    			h2.className = "svelte-1h2r50w";
    			add_location(h2, file, 74, 12, 1479);
    			div1.className = "user-data svelte-1h2r50w";
    			add_location(div1, file, 72, 8, 1411);
    			header.className = "svelte-1h2r50w";
    			add_location(header, file, 67, 4, 1186);
    			p.className = "description svelte-1h2r50w";
    			add_location(p, file, 78, 8, 1546);
    			add_location(div2, file, 77, 4, 1532);
    			div3.className = "contact-card svelte-1h2r50w";
    			add_location(div3, file, 66, 0, 1155);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, header);
    			append(header, div0);
    			append(div0, img);
    			append(header, t0);
    			append(header, div1);
    			append(div1, h1);
    			append(h1, t1);
    			append(div1, t2);
    			append(div1, h2);
    			append(h2, t3);
    			append(div3, t4);
    			append(div3, div2);
    			append(div2, p);
    			append(p, t5);
    		},

    		p: function update(changed, ctx) {
    			if (changed.userImage) {
    				img.src = ctx.userImage;
    			}

    			if (changed.userName) {
    				img.alt = ctx.userName;
    			}

    			if (changed.userImage) {
    				toggle_class(div0, "thumb-placeholder", !ctx.userImage);
    			}

    			if (changed.userName) {
    				set_data(t1, ctx.userName);
    			}

    			if (changed.jobTitle) {
    				set_data(t3, ctx.jobTitle);
    			}

    			if (changed.description) {
    				set_data(t5, ctx.description);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div3);
    			}
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { userName, jobTitle, description, userImage } = $$props;

    	const writable_props = ['userName', 'jobTitle', 'description', 'userImage'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<ContactCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('userName' in $$props) $$invalidate('userName', userName = $$props.userName);
    		if ('jobTitle' in $$props) $$invalidate('jobTitle', jobTitle = $$props.jobTitle);
    		if ('description' in $$props) $$invalidate('description', description = $$props.description);
    		if ('userImage' in $$props) $$invalidate('userImage', userImage = $$props.userImage);
    	};

    	return {
    		userName,
    		jobTitle,
    		description,
    		userImage
    	};
    }

    class ContactCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["userName", "jobTitle", "description", "userImage"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.userName === undefined && !('userName' in props)) {
    			console.warn("<ContactCard> was created without expected prop 'userName'");
    		}
    		if (ctx.jobTitle === undefined && !('jobTitle' in props)) {
    			console.warn("<ContactCard> was created without expected prop 'jobTitle'");
    		}
    		if (ctx.description === undefined && !('description' in props)) {
    			console.warn("<ContactCard> was created without expected prop 'description'");
    		}
    		if (ctx.userImage === undefined && !('userImage' in props)) {
    			console.warn("<ContactCard> was created without expected prop 'userImage'");
    		}
    	}

    	get userName() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userName(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get jobTitle() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set jobTitle(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get userImage() {
    		throw new Error("<ContactCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userImage(value) {
    		throw new Error("<ContactCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.4.4 */

    const file$1 = "src/App.svelte";

    function create_fragment$1(ctx) {
    	var h1, t0, t1, t2, t3, t4, t5, button0, t7, button1, t9, input0, t10, input1, t11, input2, t12, input3, t13, textarea, t14, current, dispose;

    	var contactcard = new ContactCard({
    		props: {
    		userName: ctx.name,
    		jobTitle: ctx.title,
    		description: ctx.description,
    		userImage: ctx.imageUrl
    	},
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text("Hello ");
    			t1 = text(ctx.uppercaseName);
    			t2 = text(", my age is ");
    			t3 = text(ctx.age);
    			t4 = text("!");
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Change Age";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "Change Name";
    			t9 = space();
    			input0 = element("input");
    			t10 = space();
    			input1 = element("input");
    			t11 = space();
    			input2 = element("input");
    			t12 = space();
    			input3 = element("input");
    			t13 = space();
    			textarea = element("textarea");
    			t14 = space();
    			contactcard.$$.fragment.c();
    			h1.className = "svelte-i7qo5m";
    			add_location(h1, file$1, 35, 0, 631);
    			add_location(button0, file$1, 36, 0, 680);
    			add_location(button1, file$1, 37, 0, 732);
    			attr(input0, "type", "text");
    			input0.value = ctx.name;
    			add_location(input0, file$1, 38, 0, 783);
    			attr(input1, "type", "text");
    			add_location(input1, file$1, 39, 0, 837);
    			attr(input2, "type", "text");
    			add_location(input2, file$1, 40, 0, 875);
    			attr(input3, "type", "text");
    			add_location(input3, file$1, 41, 0, 914);
    			attr(textarea, "type", "text");
    			add_location(textarea, file$1, 42, 0, 956);

    			dispose = [
    				listen(button0, "click", ctx.incrementAge),
    				listen(button1, "click", ctx.changeName),
    				listen(input0, "input", ctx.nameInput),
    				listen(input1, "input", ctx.input1_input_handler),
    				listen(input2, "input", ctx.input2_input_handler),
    				listen(input3, "input", ctx.input3_input_handler),
    				listen(textarea, "input", ctx.textarea_input_handler)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, h1, anchor);
    			append(h1, t0);
    			append(h1, t1);
    			append(h1, t2);
    			append(h1, t3);
    			append(h1, t4);
    			insert(target, t5, anchor);
    			insert(target, button0, anchor);
    			insert(target, t7, anchor);
    			insert(target, button1, anchor);
    			insert(target, t9, anchor);
    			insert(target, input0, anchor);
    			insert(target, t10, anchor);
    			insert(target, input1, anchor);

    			input1.value = ctx.name;

    			insert(target, t11, anchor);
    			insert(target, input2, anchor);

    			input2.value = ctx.title;

    			insert(target, t12, anchor);
    			insert(target, input3, anchor);

    			input3.value = ctx.imageUrl;

    			insert(target, t13, anchor);
    			insert(target, textarea, anchor);

    			textarea.value = ctx.description;

    			insert(target, t14, anchor);
    			mount_component(contactcard, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.uppercaseName) {
    				set_data(t1, ctx.uppercaseName);
    			}

    			if (!current || changed.age) {
    				set_data(t3, ctx.age);
    			}

    			if (!current || changed.name) {
    				input0.value = ctx.name;
    			}

    			if (changed.name && (input1.value !== ctx.name)) input1.value = ctx.name;
    			if (changed.title && (input2.value !== ctx.title)) input2.value = ctx.title;
    			if (changed.imageUrl && (input3.value !== ctx.imageUrl)) input3.value = ctx.imageUrl;
    			if (changed.description) textarea.value = ctx.description;

    			var contactcard_changes = {};
    			if (changed.name) contactcard_changes.userName = ctx.name;
    			if (changed.title) contactcard_changes.jobTitle = ctx.title;
    			if (changed.description) contactcard_changes.description = ctx.description;
    			if (changed.imageUrl) contactcard_changes.userImage = ctx.imageUrl;
    			contactcard.$set(contactcard_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			contactcard.$$.fragment.i(local);

    			current = true;
    		},

    		o: function outro(local) {
    			contactcard.$$.fragment.o(local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(h1);
    				detach(t5);
    				detach(button0);
    				detach(t7);
    				detach(button1);
    				detach(t9);
    				detach(input0);
    				detach(t10);
    				detach(input1);
    				detach(t11);
    				detach(input2);
    				detach(t12);
    				detach(input3);
    				detach(t13);
    				detach(textarea);
    				detach(t14);
    			}

    			contactcard.$destroy(detaching);

    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let name = 'Hugo';
        let title = '';
        let description = '';
        let imageUrl = 'https://avatars3.githubusercontent.com/u/3790397?s=400&v=4';
        let { age = 20 } = $$props;

        function incrementAge() {
            $$invalidate('age', age += 1);
        }

        function changeName() {
            $$invalidate('name', name = 'Whatever');
        }

        function nameInput(e) {
            const value = e.target.value;
            $$invalidate('name', name = value);
        }

    	const writable_props = ['age'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input1_input_handler() {
    		name = this.value;
    		$$invalidate('name', name);
    	}

    	function input2_input_handler() {
    		title = this.value;
    		$$invalidate('title', title);
    	}

    	function input3_input_handler() {
    		imageUrl = this.value;
    		$$invalidate('imageUrl', imageUrl);
    	}

    	function textarea_input_handler() {
    		description = this.value;
    		$$invalidate('description', description);
    	}

    	$$self.$set = $$props => {
    		if ('age' in $$props) $$invalidate('age', age = $$props.age);
    	};

    	let uppercaseName;

    	$$self.$$.update = ($$dirty = { name: 1 }) => {
    		if ($$dirty.name) { $$invalidate('uppercaseName', uppercaseName = name.toUpperCase()); }
    		if ($$dirty.name) { console.log(name); }
    		if ($$dirty.name) { if (name === 'Whatever') {
                    $$invalidate('age', age = 40);
                } }
    	};

    	return {
    		name,
    		title,
    		description,
    		imageUrl,
    		age,
    		incrementAge,
    		changeName,
    		nameInput,
    		uppercaseName,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		textarea_input_handler
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["age"]);
    	}

    	get age() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set age(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
            name: 'world',
            age: 30
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
