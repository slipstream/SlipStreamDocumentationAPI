SlipStream REST API
===================

The [rendered SlipStream API documentation](http://ssapi.sixsq.com) is
served via [GitHub Pages](https://pages.github.com).

Happy SlipStream API discovery. And please contribute patches and
updates :-)

Building Docs
-------------

The API documentation is built using
[Slate](https://github.com/tripit/slate). To build the documentation
and serve it locally, do the following:

    # install dependencies (remove --path for system-wide installation)
    $ bundle install --path vendor/bundle

    # build the documentation (use bundle to ensure paths are correct!)
    $ bundle exec rake build

    # serve the documentation from a local server
    $ cd build
    $ bundle exec middleman server

Middleman will print the endpoint of the local server.  It will
normally be `http://localhost:4567`.

Publishing Docs
---------------

Before publishing the documents on GitHub Pages, be sure to **remove**
the build directory. If you do not do this then, the publishing
process will fail with an error like:

    Command failed with status (1): [git push origin gh-pages...]

After removing the `build` directory, you can publish changes to
GitHub Pages with the following command:

    $ bundle exec rake publish

Troubleshooting
---------------

### Old Dependencies

If you have problems installing the dependencies, you may try to
update the dependency versions:

    $ bundle update

This will update the `Gemfile.lock` file.  The changes should be
checked in if they are shown to work.

### Multiple Ruby Versions

On the Mac, you may have multiple versions of ruby installed, which
will lead to issues when installing gems.  Ensure that `/usr/bin/ruby`
is the executable available on the PATH. 

