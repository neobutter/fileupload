var run = undefined;

$(document).ready(function() {
    try {
        var options = JSON.parse(localStorage.getItem('fingerprint-options'));    
        if (!options) {
            throw 'asdfasf'
        }
    } catch (error) {
        var options = {
            "swfContainerId": "font-list",
            "swfPath": "img/FontList.swf",
            "excludeUserAgent": false,
            "excludeLanguage": false,
            "excludeColorDepth": false,
            "excludeScreenResolution": false,
            "excludeAvailableScreenResolution": false,
            "excludeTimezoneOffset": false,
            "excludeSessionStorage": false,
            "excludeIndexedDB": false,
            "excludeAddBehavior": false,
            "excludeOpenDatabase": false,
            "excludeCpuClass": false,
            "excludePlatform": false,
            "excludeDoNotTrack": false,
            "excludeCanvas": false,
            "excludeWebGL": false,
            "excludeAdBlock": false,
            "excludeHasLiedLanguages": false,
            "excludeHasLiedResolution": false,
            "excludeHasLiedOs": false,
            "excludeHasLiedBrowser": false,
            "excludeJsFonts": false,
            "excludeFlashFonts": false,
            "excludePlugins": false,
            "excludeIEPlugins": false,
            "excludeTouchSupport": false,
            "excludePixelRatio": false,
            "excludeHardwareConcurrency": false
        };  
    }

    var optionDescription = {
        "excludeUserAgent": "user agent should not take part in FP calculation",
        "excludeLanguage": "browser language (https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)",
        "excludeColorDepth": "color depth (https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth)",
        "excludeScreenResolution": "screen resolution",
        "excludeAvailableScreenResolution": "",
        "excludeTimezoneOffset": "user time zone",
        "excludeSessionStorage": "user browser support of session storage",
        "excludeIndexedDB": "user browser support of IndexedDB",
        "excludeAddBehavior": "IE specific 'AddBehavior' method detection",
        "excludeOpenDatabase": "user browser support of OpenDatabase",
        "excludeCpuClass": "detection of CPU class",
        "excludePlatform": "detection of OS platform",
        "excludeDoNotTrack": "is DoNotTrack set",
        "excludeCanvas": "skip canvas fingerprinting entirely (you will most likely not need to set this to true)",
        "excludeWebGL": "skip WebGL fingerprinting",
        "excludeAdBlock": "skip AdBlock detection",
        "excludeHasLiedLanguages": "skip check if user is trying to hide his browser language",
        "excludeHasLiedResolution": "skip check if user is trying to hide his screen resolution",
        "excludeHasLiedOs": "skip check if user is trying to hide his OS info",
        "excludeHasLiedBrowser": "skip check if user is trying to hide his browser information",
        "excludeJsFonts": "skip font detection with CSS \"side channel\"",
        "excludeFlashFonts": "skip font detection with Flash (disabled by default)",
        "excludePlugins": "skip plugin enumeration/detection",
        "excludeIEPlugins": "skip IE plugin enumeration/detection",
        "excludeTouchSupport": "skip touch screen specific info fingerprinting",
        "excludePixelRatio": "skip device pixel ratio",
        "excludeHardwareConcurrency": "skip device pixel ratio"
    };

    var i = 1;
    $.each(options, function (index, value) {
        if (index === 'swfContainerId' || index === 'swfPath') {
            return;
        }

        $('#options').append('<label class="btn btn-success '+ (value ? 'active' : '')  + '" data-toggle="tooltip" data-placement="top" title="' + optionDescription[index] + '"><input type="checkbox" name="' + index + '" checked autocomplete="off">' + index  + '</label>');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(':checkbox').change(function (e) {
        var temp = $(e.target);
        options[temp.attr('name')] = temp.is(":checked");
    });

    run = function () {
        try {
            localStorage.setItem('fingerprint-options', JSON.stringify(options));
        } catch (error) {
            console.warn('로컬에서는 LocalStorage 사용 불가');
        }

        $('#result > tbody').empty();

        new Fingerprint2(options).get(function(result, components) {
            $('#fingerprint-result').text(result);

            $.each(components, function (index, value) {
                $('#result > tbody').append('<tr><td>' + value.key + '</td><td>' + value.value + '</td></tr>');
            });
        });
    };
});