Django API Playground
---------------------

A django app that creates api explorer for RESTful APIs.

Works with any RESTful API. For example, you can create api explorer for your tastypie based API with this app.

![API Playground](https://github.com/fatiherikli/django-api-playground/raw/master/docs/images/api-playground-1.png)

![API Playground](https://github.com/fatiherikli/django-api-playground/raw/master/docs/images/api-playground-2.png)


Instructions
------------

Install from the pip:

    pip install django-api-playground

Or from the source:

    git clone git://github.com/fatiherikli/django-api-playground.git
    cd django-api-playground
    python setup.py install

Add to installed apps:

    INSTALLED_APPS =(
        # ...

        'apiplayground',
    )

Installation is completed. You can define the API schema now.

Firs step, Create a url:

    # urls.py

    from api.playgrounds import ExampleAPIPlayground

    urlpatterns = patterns('',
        (r'api-explorer/', include(ExampleAPIPlayground().urls)),
    )

Second step, Define a subclass for your API:

    # api/playgrounds.py

    from apiplayground import APIPlayground

    class ExampleAPIPlayground(APIPlayground):

        schema = {
            "title": "API Playground",
            "base_url": "http://localhost/api/",
            "resources": [
                {
                    "name": "/feedbacks",
                    "description": "This resource allows you to manage feedbacks.",
                    "endpoints": [
                        {
                            "method": "GET",
                            "url": "/api/feedbacks/{feedback-id}",
                            "description": "Returns a specific feedback item"
                        },
                        {
                            "method": "POST",
                            "url": "/api/feedbacks/",
                            "description": "Creates new feedback item",
                            "parameters": [{
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "name": "resource",
                                "type": "string"
                            },
                            {
                               "name": "description",
                               "type": "string"
                            }]
                        }
                    ]
                },
            ]
        }

That's all. More detailed documentation will be coming soon.