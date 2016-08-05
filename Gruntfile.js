module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: "src/layouts/default.hbs",
                flatten: true,
                partials: 'src/partials/*.hbs'
            },
            pages: {
                files: {
                    'web/': ['src/pages/**/*.hbs']
                }
            }
        },
        clean: {
            all: ['web/*.html']
        },

        // Compile the .scss files to "/site" folder
        less: {
            dist: {
                files: [{
                    'web/css/main.css': 'style/main.less'
                }]
            }
        },

        watch: {
            assemble: {
                files: [
                    'src/pages/**/*.hbs', 'src/partials/*.hbs'
                ],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                    livereload: ''
                },
                files: [
                    'web/*.html'
                ]
            },
            styles: {
                files: ['style/*.less'],
                tasks: ['less:dist']
            },
            js: {
                files: ['js/**/*.less'],
                tasks: ['jshint']
            }
        },

        connect: {
            options: {
                port: 8800,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                livereload: 35728
            },
            livereload: {
                options: {
                    open: true,
                    base: 'web'
                }
            }
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "web"
                    }
                }
            }
        },

        jshint: {
            files: ['js/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/**/*.js'],
                dest: 'web/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'web/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['connect:livereload', 'clean', 'assemble', 'less:dist', 'browserSync', 'jshint', 'concat', 'uglify', 'watch']);
};
