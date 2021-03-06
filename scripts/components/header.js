(function(){

    $(document).ready(function(){

        var Header = {
            test: true,
            menuDropdown: $('#menu-dropdown'),
            menuBtn: $('#menu-btn'),
            searchBtn: $('#search'),
            searchAlert: $('#search-alert'),
            alertTimeout: null,
            hasBackground: $('.top-bar').hasClass('bg-header') ? true : false,
            logo: $('#header-logo img'),
            expandMenuBar: $('#expand-menu'),
            expandSections: $('.expand-section'),
            show: function(){
                var self = this;
                if (!self.menuBtn.hasClass('tm-close')){
                    self.menuBtn.addClass('tm-close');
                    self.menuDropdown.removeClass('closed').addClass('expanded');
                    self.menuDropdown.focus();
                    if (self.hasBackground){
                        self.menuBtn.removeClass('white');
                        self.searchBtn.removeClass('white');
                        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768)
                            self.logo.attr('src', '/assets/img/header/tm-developer-logo-p-1.svg');
                    }
                }
            },
            hide: function(){
                var self = this;
                setTimeout(function(){
                    self.menuBtn.removeClass('tm-close')
                    if (self.hasBackground){
                        self.menuBtn.addClass('white');
                        self.searchBtn.addClass('white');
                        self.logo.attr('src', '/assets/img/header/tm-developer-logo.svg');
                    }
                }, 300);
                self.menuDropdown.removeClass('expanded').addClass('closed');
            },
            init: function(){
                var self = this;
                self.menuBtn.on("click", function(){
                    if (!self.menuBtn.hasClass("tm-close"))
                        self.show();
                    else
                        self.hide();
                });

                //using document click listener since mobile iOS touch devices do not understand blur event
                $(document).on("click touchend", function (e) {
                    var menuCloseBtn = $(".tm-close");
                    if (!self.menuDropdown.is(e.target)
                        && self.menuDropdown.has(e.target).length === 0
                        && !menuCloseBtn.is(e.target)
                        && menuCloseBtn.has(e.target).length === 0
                        && menuCloseBtn.length) {
                        self.hide();
                    }
                });

                $('.expandable').on('mouseenter', function(){
                    $(this).addClass('expanded');
                    self.expandSections.hide();
                    self.expandMenuBar.find('#expand-' + $(this).attr('data-expands-to')).show();
                    self.expandMenuBar.addClass('expanded');
                }).on('mouseleave', function(){
                    $(this).removeClass('expanded');
                    self.expandMenuBar.removeClass('expanded');
                });

                self.expandMenuBar.on('mouseleave', function(){
                    $(this).removeClass('expanded');
                }).on('mouseenter', function(){
                    $(this).addClass('expanded');
                });
            }
        };

        Header.init();

    });

})();