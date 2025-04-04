angular.module('musicPlayerApp', [])
    .controller('MusicPlayerController', function($scope) {
        // Sample playlist with publicly available audio URLs
        $scope.tracks = [
            { title: 'Song 1', artist: 'Artist 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { title: 'Song 2', artist: 'Artist 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
            { title: 'Song 3', artist: 'Artist 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
        ];

        // Initial state
        $scope.currentTrack = $scope.tracks[0];
        $scope.isPlaying = false;
        $scope.progress = 0;

        // Get the audio element
        var audio = document.getElementById('audioPlayer');

        // Play or pause the track
        $scope.togglePlay = function() {
            if ($scope.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            $scope.isPlaying = !$scope.isPlaying;
        };

        // Play a selected track
        $scope.playTrack = function(track) {
            if ($scope.currentTrack !== track) {
                $scope.currentTrack = track;
                audio.src = track.url;
                audio.play();
                $scope.isPlaying = true;
            } else {
                $scope.togglePlay();
            }
        };

        // Next track
        $scope.nextTrack = function() {
            var currentIndex = $scope.tracks.indexOf($scope.currentTrack);
            var nextIndex = (currentIndex + 1) % $scope.tracks.length;
            $scope.playTrack($scope.tracks[nextIndex]);
        };

        // Previous track
        $scope.prevTrack = function() {
            var currentIndex = $scope.tracks.indexOf($scope.currentTrack);
            var prevIndex = (currentIndex - 1 + $scope.tracks.length) % $scope.tracks.length;
            $scope.playTrack($scope.tracks[prevIndex]);
        };

        // Update progress bar as the song plays
        audio.addEventListener('timeupdate', function() {
            $scope.$apply(function() {
                $scope.progress = (audio.currentTime / audio.duration) * 100 || 0;
            });
        });

        // Seek to a position in the track
        $scope.seek = function() {
            var time = ($scope.progress / 100) * audio.duration;
            audio.currentTime = time;
        };
    });
