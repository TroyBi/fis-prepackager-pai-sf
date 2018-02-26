/**
 * fis.baidu.com
 * @bilipeng 参考 fis-prepackager-iknow-sf by@jinz
 */

'use strict';

function sfReplace(content) {
    // 替换define为zd下的define, 避免跟全局的搞乱了
    return content.replace(/^\W*define\(['"]/g, function(word, match) {
            var ret = word.replace('define', '_zd_global_.define');
            console.log('👭 ==> replacement:1:' + '[' + word + ']' + ' => [' + ret + ']');
            return ret;
        })
        // 替换大F全局变量
        .replace(/(.|\s|=|'|"|\.|\(|\)){3}F\.context\(/g, function(word) {
            // 如果已经替换过了（检测到有_zd_global_.），则直接返回
            if (/_\./.test(word)) {
                console.log('--👑-----------replaced----------👑--');
                return word;
            }
            var ret = word.replace('F', '_zd_global_.F');
            console.log('👑 ==> replacement:2:' + '[' + word + ']' + ' => [' + ret + ']');
            return ret;
        })

        // 替换$符选择器
        .replace(/\$\('[\.#][^']+?'\)/g, function(word) {
            var ret = word.replace('$', '$(_zd_global_.g.container).find');
            console.log('💪 ==> replacement:3:' + '[' + word + ']' + ' => [' + ret + ']');
            return ret;
        });

}


var exports = module.exports = function(ret, conf, settings, opt) {
    var ids = ret.ids || {};
    fis.util.map(ids, function(src, file) {
        var origin = file.getContent();
        if (/^\.js$/.test(file.rExt)) {
            var content = sfReplace(origin);
            if (content !== origin) {
                file.setContent(content);
                console.log('💋 💋 💋 💋 💋 💋 [LOG] SF completed in [ ' + file.id + ' ]💋 💋 💋 💋 💋 💋 ');
            }
        }
    });
};