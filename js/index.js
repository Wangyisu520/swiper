(function ($) {
    function Swiper(opt) {
        var opts = opt || {};
        this.wrap = opts.fater;
        this.img = opts.image;
        this.interval = opts.interval;
        this.init();
    }

    Swiper.prototype.init = function () {
        this.newIndex = 0;
        this.len = this.img.length - 1;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.itemHeight = parseInt(this.wrap.css('height'));
        this.timer = undefined;
        this.flag = true;
        this.creatDom();
        this.sliderAuto();
        this.bindEvent();
    }
    Swiper.prototype.creatDom = function () {
        var len = this.len;
        var str = '';
        var listStr = '';
        var imgList = $('<ul class="img-box">');
        var btn = $('<div class="btn">\
                    <a href="javascript:void(0)" class="prev"><span></span></a>\
                    <a href="javascript:void(0)" class="next"><span></span></a>\
                    </div>');
        var oder = $('<div class="index-box">');
        var list = $('<ul></ul>');
        for (var i = 0; i < len; i++) {
            str += '<li><a href="#"><img src="' + this.img[i] + '" alt=""></a></li>';
            listStr += '<li></li>';
        }
        str += '<li><a href="#"><img src="' + this.img[0] + '" alt=""></a></li>';
        list.append(listStr);
        this.wrap.append(imgList.html(str)).append(btn).append(oder.append(list))
        this.wrap.find('.img-box').css({
            width: this.itemWidth * (len + 1) + 'px',
        })
        this.wrap.find('.img-box li').css({
            width: this.itemWidth + 'px',
        })
        this.wrap.find('.index-box li').eq(0).addClass('active');
    }
    Swiper.prototype.sliderAuto = function () {
        var self = this;
        clearTimeout(this.timer)
        this.timer = setTimeout(function () {
            self.move('right');
        }, this.interval)
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        var prev = self.wrap.find('.prev');
        var next = self.wrap.find('.next');
        self.wrap.find('.index-box li').add(prev).add(next).on('click', function () {
            if ($(this).attr('class') == 'prev') {
                self.move('left');
            } else if ($(this).attr('class') == 'next') {
                self.move('right');
            } else {
                var index = $(this).index();
                self.move(index);
            }
        });
        self.wrap.on('mouseenter', function () {
            self.wrap.find('.btn').show();
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            self.wrap.find('.btn').hide();
            self.sliderAuto();
        })
    }
    Swiper.prototype.move = function (direction) {
        var len = this.len;
        var liWidth = this.itemWidth;
        if (this.flag) {
            this.flag = false;
            if (direction == 'left' || direction == 'right') {
                if (direction == 'left') {
                    if (this.newIndex == 0) {
                        this.wrap.find('.img-box').css({
                            left: -(len * liWidth)
                        })
                        this.newIndex = len - 1;
                    } else {
                        this.newIndex = this.newIndex - 1;
                    }
                } else {
                    if (this.newIndex == len - 1) {
                        this.wrap.find('.img-box').animate({
                            left: -(len * liWidth)
                        }, function () {
                            $(this).css({
                                left: 0
                            })
                           
                        })
                        this.newIndex = 0;
                    } else {
                        this.newIndex = this.newIndex + 1;
                    }
                }
            } else {
                this.newIndex = direction;
            }
            this.slider();
            this.changStyle();
        }
    }
    Swiper.prototype.slider = function () {
        var liWidth = this.itemWidth;
        var self = this;
        self.wrap.find('.img-box').animate({
            left: -(this.newIndex * liWidth),
        }, function () {
            self.sliderAuto();
            self.flag = true;
        })
    }

    Swiper.prototype.changStyle = function () {
        this.wrap.find('.active').removeClass('active');
        this.wrap.find('.index-box li').eq(this.newIndex).addClass('active')
    }
    $.fn.extend({
        sliderImg: function (options) {
            options.fater = this || $('body');
            new Swiper(options);
        }
    })
})(jQuery)