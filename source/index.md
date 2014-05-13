---
title: SlipStream | API Doc

language_tabs:
  - shell

toc_footers:
  - <a href='http://github.com/slipstream/SlipStreamServer'>SlipStream code is hosted on GitHub</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>
  - <a href='http://sixsq.com'>SlipStream is developed by SixSq</a>

---

# SlipStream v2.2 API Reference

## Introduction

Welcome to the SlipStream API. You can use our API to access SlipStream endpoints in order to manipulate
different REST resources, including project, image, deployment, available as *module*, as well as run and user.

This API focuses on the REST service offered and has been documented in Bash. You can view code examples in the dark area to the right.

This API documentation page was created with [Slate](http://github.com/tripit/slate). Feel free to report
any snags in the document in [GitHub](http://github.com/slipstream/SlipStreamDocumentationAPI).

> Adding `?media=xml`(for XML) at the end of the URL in the browser, you request the response to be returned in the specified content-type:

```shell
https://slipstream.sixsq.com?media=xml
```

> is equivalent to

```shell
https://slipstream.sixsq.com -H "Content-Type: application/xml"
```


<aside class="notice">
You can get a serialised version of most SlipStream resources directly in the browser.
</aside>


## Resource Oriented Architecture (ROA)

SlipStream's REST design was inspired from Richardson and Ruby's excellent book:
[RESTful Web Services](http://shop.oreilly.com/product/9780596529260.do). They present the
Resource Oriented Architecture (ROA) concept, which guided several design choices, including
the resources-based architecture underpinning SlipStream.  For example, each version of an image,
deployment and project can be uniquely identified via a unique URI.


# Authentication

With the exception of the documentation and the login pages, all resources require authentication.

SlipStream currently supports both `Basic Authentication` and `Cookies`. To generate a time limited
cookie, use the `/login` resource.

# Login

## Basic authentication

SlipStream supports basic authentication.  This can be tested using simple username/password pair.

```shell
curl https://slipstream.sixsq.com?media=xml -u <user>:<password>
```
> or

```shell
curl https://<user>:<password>@slipstream.sixsq.com?media=xml
```

```xml
<welcome>
   <modules>
      <item resourceUri="module/Mebster/48" category="Project" version="48" name="Mebster">
         <authz owner="meb" ownerGet="true" ownerPut="true" ownerPost="false" ownerDelete="true" ownerCreateChildren="true" groupGet="false" groupPut="false" groupPost="false" groupDelete="false" groupCreateChildren="false" publicGet="false" publicPut="false" publicPost="false" publicDelete="false" publicCreateChildren="false" inheritedGroupMembers="true">
            <groupMembers class="java.util.ArrayList"/>
         </authz>
      </item>
      <item resourceUri="module/SlipStream/280" category="Project" description="SlipStream dog fooding :-)" version="280" name="SlipStream">
         <authz owner="sixsq_dev" ownerGet="true" ownerPut="true" ownerPost="false" ownerDelete="true" ownerCreateChildren="true" groupGet="true" groupPut="true" groupPost="false" groupDelete="false" groupCreateChildren="false" publicGet="false" publicPut="false" publicPost="false" publicDelete="false" publicCreateChildren="false" inheritedGroupMembers="false">
            <groupMembers class="java.util.ArrayList">
               <string>lionel</string>
               <string>konstan</string>
               <string>loomis</string>
               <string>meb</string>
               <string>rob</string>
               <string>sebastien.fievet</string>
            </groupMembers>
         </authz>
      </item>
...

```

> The above command returns a header structured like this:



## Generate a cookie

```shell
curl https://slipstream.sixsq.com/login -d username=<user> -d password=<password> -H "Content-Type: application/xml"
```

> The above command returns a header structured like this:

```http
HTTP/1.1 200 OK
Server: nginx/1.4.7
Date: Tue, 06 May 2014 18:46:12 GMT
Accept-Ranges: bytes
Location: https://slipstream.sixsq.com
Server: Restlet-Framework/2.1m4
Set-Cookie: com.sixsq.slipstream.cookie=SOME_LONG_STRING; Path=/
Content-Length: 0
```

This resource allows users to generate a time limited cookie. The value of the cookie corresponds
to the `Set-Cookie` of the response header.

### HTTP Request

`POST https://slipstream.sixsq.com/login`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
username | true | Username to authenticate with
password | true | Password corresponding to the username

<aside class="notice">
Remember — with the exception of this resource and the documentation, all resources require authentication.
</aside>



# Module

(Extracted from the tutorial documentation)

Metadata about your images and deployments are organized into projects in SlipStream. Each project consists of a number of modules. The modules may be Project, Machine Image or Deployment modules:

  * *Project*: A container of modules used to provide logical grouping. A project may contain other projects allowing a hierarchical organization for large projects.

  * *Machine image*: A module that contains information about a virtual machine image. One type of machine image is a native image. These contain a cloud-specific identifier for a particular cloud infrastructure. The other type of machine image, a derived image, references another image (which can be a native image or another derived image) and includes a list of packages to install and/or recipes to configure the machine. These modules also include input/output parameters such that the machine can be synchronized as part of a deployment.

  * *Deployment*: A module that describes a coordinated deployment of one or more nodes. The deployment associates a machine image to each node and defines the synchronizaton necessary for the coordinated deployment.

These items are normalised into *module* resources in the REST API.

<aside class="notice">
Remember, image, deployment and project are type attributes of the module resource.
</aside>

## Get a module

```shell
curl https://slipstream.sixsq.com/module/<module> --user <user>:<password> -H "Content-Type: application/xml"
```

> The above command returns a response body structured like this:

```xml
<imageModule category="Image" creation="2013-12-02 17:00:37.421 UTC" deleted="false" description="Minimal installation of the Ubuntu 12.04 (LTS) operating system." imageId="8c7e60ae-3a30-4031-a3e6-29832d85d7cb" isBase="true" isLatestVersion="true" lastModified="2014-05-04 12:36:06.105 UTC" loginUser="ubuntu" logoLink="http://design.ubuntu.com/wp-content/uploads/ubuntu-logo14.png" parentUri="module/examples/images" platform="ubuntu" shortName="ubuntu-12.04" version="480">
	<parameters>
		<entry>
			<string>extra.disk.volatile</string>
			<parameter category="Cloud" description="Volatile extra disk in GB" isSet="false" mandatory="true" name="extra.disk.volatile" order="0" order_="0" readonly="false" type="String"/>
		</entry>
		<entry>
			<string>exoscale-ch-gva.instance.type</string>
			<parameter category="exoscale-ch-gva" description="Instance type (flavor)" isSet="true" mandatory="true" name="exoscale-ch-gva.instance.type" order="0" order_="0" readonly="false" type="String">
				<value>Small</value>
				<defaultValue>Small</defaultValue>
			</parameter>
		</entry>
...
		<entry>
			<string>ec2-eu-west.security.group</string>
			<parameter category="ec2-eu-west" description="Security groups (comma separated list)" isSet="true" mandatory="true" name="ec2-eu-west.security.group" order="0" order_="0" readonly="false" type="String">
				<value>default</value>
				<defaultValue>default</defaultValue>
			</parameter>
		</entry>
	</parameters>
	<authz groupCreateChildren="false" groupDelete="false" groupGet="true" groupPost="true" groupPut="false" inheritedGroupMembers="true" owner="sixsq" ownerCreateChildren="true" ownerDelete="true" ownerGet="true" ownerPost="true" ownerPut="true" publicCreateChildren="false" publicDelete="false" publicGet="true" publicPost="true" publicPut="false">
		<groupMembers />
	</authz>
	<commit author="sixsq"/>
	<published publicationDate="2014-05-04 12:36:06.105 UTC"/>
	<cloudNames length="3">
		<string>exoscale-ch-gva</string>
		<string>ec2-eu-west</string>
		<string>default</string>
	</cloudNames>
	<runs/>
	<targets />
	<packages />
	<prerecipe/>
	<recipe/>
	<cloudImageIdentifiers>
		<cloudImageIdentifier cloudImageIdentifier="ami-a0dd3dd7" cloudServiceName="ec2-eu-west"/>
		<cloudImageIdentifier cloudImageIdentifier="8c7e60ae-3a30-4031-a3e6-29832d85d7cb" cloudServiceName="exoscale-ch-gva"/>
	</cloudImageIdentifiers>
</imageModule>
```


Get a module (i.e. image, deployment or project).

### HTTP Request

`GET https://slipstream.sixsq.com/module/[<module>[/<version>]]`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
module | true | Unique identifier of the module - e.g. *examples/images/ubuntu-12.04*.
version | false | Version of the module to update. If not provided, get the latest (most recent)

<aside class="notice">
To list the root projects, simply omit the *&lt;MODULE>* from the request.
</aside>

```shell
curl https://slipstream.sixsq.com/module/examples/foo -H "Content-Type: application/xml" --user <user>:<password> > foo.xml
```

## Update a module

Update a module (i.e. image, deployment or project).

The PUT request will create a new resource with the same &lt;module> name but a higher &lt;version>. The response includes the new fully qualified resource.

### HTTP Request

`PUT https://slipstream.sixsq.com/module/<module>/<version>`

The **Location** attribute in the response header provides the full url of the updated resource, with the incremented version.

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
module | true | Unique identifier of the module - e.g. *examples/images/ubuntu-12.04*. If not provided, list the root modules.
version | false | Version of the module. If not provided, get the latest (most recent)


```shell
curl https://slipstream.sixsq.com/module/<module> --user <user>:<password> --data @<file> -X PUT -H "Content-Type: application/xml"
```

> where &lt;file> is an xml file - e.g. the result of a previous GET on the same resource

> The above command returns a header structured like this:

```http
HTTP/1.1 200 OK
Date: Mon, 12 May 2014 15:16:49 GMT
Accept-Ranges: bytes
Location: https://slipstream.sixsq.com/module/examples/foo/1199
Server: Restlet-Framework/2.1m4
Set-Cookie: com.sixsq.slipstream.cookie=com.sixsq.idtype=local&com.sixsq.identifier=test&com.sixsq.expirydate=1399951006191&com.sixsq.signature=-cotcj9t5rzu3zx2uof96x8scptxh5mbraazmf63doem22tkvlq1519twaz7uxlvtyyxd0fxvygvrsn1hip09yvn7v11c9a74j21; Path=/
Content-Length: 0
```

> To see the header, add *-D -* (with the trailing dash) to the curl command


<aside class="warning">
This PUT request is not idem potent - i.e. calling it several times will create new resources.
</aside>

## Delete a module

Delete a module (i.e. image, deployment or project).

The DELETE request will delete the specified resource if fully qualified (i.e. including the &lt;VERSION>) or the latest version otherwise.

### HTTP Request

`DELETE https://slipstream.sixsq.com/module/<module>/<version>`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
module | true | Unique identifier of the module - e.g. *examples/images/ubuntu-12.04*.
version | false | Version of the module. If not provided, delete the latest (most recent)

```shell
curl https://slipstream.sixsq.com/module/<module> -u <user>:<password> -X DELETE -D -
```

> The above command returns a header structured like this:

```http
HTTP/1.1 204 No Content
Date: Tue, 13 May 2014 03:08:15 GMT
Accept-Ranges: bytes
Location: https://slipstream.sixsq.com/module/examples/toto/11
Server: Restlet-Framework/2.1m4
Set-Cookie: com.sixsq.slipstream.cookie=com.sixsq.idtype=local&com.sixsq.identifier=test&com.sixsq.expirydate=1399993694970&com.sixsq.signature=izoalqmos489wxw8z25k03nqtsdfyxyv2ak5adi1e0h73zdziq45y1eat66tcob5ybvh7oe5gbh8es1onj4f6orj2enrqu9w9j0; Path=/
Content-Length: 0
```

## Module history (versions)

List all the history (i.e. all the versions) of the module. Since each PUT creates a new version
of the module, this request allows users to list these. 

### HTTP Request

`GET https://slipstream.sixsq.com/module/<module>/`

<aside class="notice">
Notice the trailing '/' in the URL
</aside>

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
module | true | Unique identifier of the module - e.g. *examples/images/ubuntu-12.04*.

```shell
curl https://slipstream.sixsq.com/module/<module>/ -u <user>:<password>
```

```xml
<versionList>
   <item resourceUri="module/examples/an-image/12" lastModified="2014-05-13 04:53:47.339 CEST" version="12" category="Image" name="an-image">
      <authz owner="test" ownerGet="true" ownerPut="true" ownerPost="true" ownerDelete="true" ownerCreateChildren="true" groupGet="false" groupPut="false" groupPost="false" groupDelete="false" groupCreateChildren="false" publicGet="false" publicPut="false" publicPost="false" publicDelete="false" publicCreateChildren="false" inheritedGroupMembers="true">
         <groupMembers />
      </authz>
      <commit author="test">
         <comment></comment>
      </commit>
   </item>
   <item resourceUri="module/examples/an-image/2" lastModified="2014-05-12 14:33:53.39 CEST" version="2" category="Image" name="an-image">
      <authz owner="test" ownerGet="true" ownerPut="true" ownerPost="true" ownerDelete="true" ownerCreateChildren="true" groupGet="false" groupPut="false" groupPost="false" groupDelete="false" groupCreateChildren="false" publicGet="false" publicPut="false" publicPost="false" publicDelete="false" publicCreateChildren="false" inheritedGroupMembers="true">
         <groupMembers />
      </authz>
      <commit author="test"/>
   </item>
</versionList>
```

# Run

The *run* resource represents an execution in the cloud - i.e. running VMs.
SlipStream supports 3 types of runs:

 * Simple run: result of running an image
 * Deployment: result of running a deployment
 * Build image: result of creating a new image from an image template (or blueprint)

The run resource therefore represents one or several VMs, running or not depending
on the state of the run.

## List all Runs

List all runs of a user.

### HTTP Request

`GET https://slipstream.sixsq.com/run`

```shell
curl https://slipstream.sixsq.com/run -u <user>:<password>
```

```xml
<runs>
   <item resourceUri="run/4f187379-cdb9-470d-9656-b6fac6dc33d8" uuid="4f187379-cdb9-470d-9656-b6fac6dc33d8" moduleResourceUri="module/examples/tutorials/service-testing/system/471"
status="Done" startTime="2014-05-10 15:22:56.882 UTC" cloudServiceName="exoscale-ch-gva" username="meb" type="Orchestration" tags=""/>
   <item resourceUri="run/fa3b9652-9dac-49e2-9573-b761777c8238" uuid="fa3b9652-9dac-49e2-9573-b761777c8238" moduleResourceUri="module/examples/tutorials/service-testing/system/471"
status="Done" startTime="2014-05-10 15:13:29.352 UTC" cloudServiceName="exoscale-ch-gva" username="meb" type="Orchestration" tags=""/>
</runs>
```

## Get a Run

Get a specific run.

### HTTP Request

`GET https://slipstream.sixsq.com/run/<run>`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
run       | true     | Run unique identifier - e.g. *fa3b9652-9dac-49e2-9573-b761777c8238*.

```shell
curl https://slipstream.sixsq.com/run/<run> -u <user>:<password>
```

```xml
<runs>
   <item resourceUri="run/4f187379-cdb9-470d-9656-b6fac6dc33d8" uuid="4f187379-cdb9-470d-9656-b6fac6dc33d8" moduleResourceUri="module/examples/tutorials/service-testing/system/471" status="Done" startTime="2014-05-10 15:22:56.882 UTC" cloudServiceName="exoscale-ch-gva" username="meb" type="Orchestration" tags=""/>
   <item resourceUri="run/fa3b9652-9dac-49e2-9573-b761777c8238" uuid="fa3b9652-9dac-49e2-9573-b761777c8238" moduleResourceUri="module/examples/tutorials/service-testing/system/471" status="Done" startTime="2014-05-10 15:13:29.352 UTC" cloudServiceName="exoscale-ch-gva" username="meb" type="Orchestration" tags=""/>
</runs>
```

## Create a Run

Create a new run.

The **Location** attribute in the response header provides the full url of the updated resource, with the incremented version.

### HTTP Request

`POST https://slipstream.sixsq.com/run/`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
refqname  | true     | Reference module from which to create a run. Must be an *Image* or *Deployment* category - e.g. *fa3b9652-9dac-49e2-9573-b761777c8238*.
type      | depends  | Type of run. This is only required when running an image, since we can either deploy a VM (i.e. simple run) or create a new image (i.e. build). See below for type definition.

Run Type       | Description
-------------- | --------
Orchestration  | Deployment: only applies to deployment category.  This is the only valid type value for deployment, thus does not have to be provided.
Machine        | Build: build a new image on the targeted cloud and set the unique id back in the image definition.
Run            | Simple run: single VM deployment.


```shell
curl https://slipstream.sixsq.com/run -d refqname=module/examples/an-image -d type=Run -u test:tesTtesT -X POST -H "Content-Type: text/plain" -D -
```

> The above command returns a header structured like this:

```http
HTTP/1.1 201 Created
Date: Tue, 13 May 2014 11:29:56 GMT
Accept-Ranges: bytes
Location: https://slipstream.sixsq.com/run/cce5ac6d-5465-4773-9875-66f21c65e15e
Server: Restlet-Framework/2.1m4
Set-Cookie: com.sixsq.slipstream.cookie=com.sixsq.idtype=local&com.sixsq.identifier=test&com.sixsq.expirydate=1400023769837&com.sixsq.signature=eck79w5qyslb16ke31vfof2b9o6729mcsjgnsqc143nsgqkuepmkgqnaakv544x7nankz4875p0uyg8unl8d5m4dl60wzr6pcpn; Path=/
Content-Length: 0
```

# Virtual machines

List status of all VMs, as known by the cloud providers.

### HTTP Request

`GET https://slipstream.sixsq.com/vms`

```shell
curl https://slipstream.sixsq.com/vms --user <user>:<password>
```

> The above command returns a body structured like this:

```xml
<vms>
   <vm cloud="ec2-eu-west" user="meb" instanceId="i-bbeb1dfb" state="Detached" measurement="2014-05-13 11:56:03.166 UTC" runUuid="Running"/>
   <vm cloud="ec2-eu-west" user="meb" instanceId="i-7a3de138" state="Detached" measurement="2014-05-13 11:56:03.189 UTC" runUuid="Running"/>
   <vm cloud="ec2-eu-west" user="meb" instanceId="i-a803dfea" state="terminated" measurement="2014-05-13 11:56:03.209 UTC" runUuid="Unknown"/>
</vms>
```

# Statistics

List status of current runs, including consumption metrics such as core/cpu, ram and disk.

### HTTP Request

`GET https://slipstream.sixsq.com/stats[?user=<username>]`

Parameter | Required | Description
--------- | -------- | -----------
username  | false     | Only applicable to privileged user. Filters the stats result for this user.

```shell
curl https://slipstream.sixsq.com/stats --user <user>:<password>
```

> The above command returns a body structured like this:

```xml
<vms>
   <vm instance_id="6e08a7d4-c59f-4d52-bf55-f863dd5ad69b" run_id="f0ef787a-984d-4acd-94cd-ecc2a85ed6d5" index="0" node="machine" name="module/examples/images/centos-6/248" image_id="examples/images/centos-6" user_id="meb" type="Run" cloud="cloudsigma-ch1" cpu="1" ram="1" disk="1" created_at="2014-05-13 18:58:40.56 CEST" state="Detached" vmstate="running"/>
   <vm run_id="4b15a127-44a5-4912-ba09-34608f967b03" index="0" node="machine" name="module/examples/images/centos-6/248" image_id="examples/images/centos-6" user_id="meb" type="Run" cloud="atos-es1" cpu="0" ram="0" disk="1" created_at="2014-05-13 18:54:08.740 CEST" state="Aborting" vmstate="Unknown"/>
   <vm instance_id="535991c9-a7d1-4e79-a56a-1831137d60e5" run_id="4e8d2d74-b5f9-4092-923a-0635c2eee077" index="0" node="machine" name="module/examples/images/centos-6/248" image_id="examples/images/centos-6" user_id="meb" type="Run" cloud="cloudsigma-ch1" cpu="1" ram="1" disk="1" created_at="2014-05-09 10:00:45.272 CEST" state="Detached" vmstate="Unknown"/>
</vms>
```

# User

The user resource provides user management.

## Get All Users

<aside class="notice">This resource is restricted to privileged users.</aside>

List all users.

```shell
curl https://slipstream.sixsq.com/user --user <user>:<password>
```

> The above command returns XML structured like this:

```xml
<list>
<item name="sixsq" resourceUri="user/sixsq" firstName="SixSq" lastName="Administrator" state="ACTIVE" lastOnline="2014-04-02 14:22:05.86 CEST" online="false"/>
<item name="super" resourceUri="user/super" firstName="Super" lastName="User" state="ACTIVE" lastOnline="2014-05-06 21:12:42.520 CEST" online="true"/>
<item name="test" resourceUri="user/test" firstName="Test" lastName="User" state="ACTIVE" lastOnline="2014-05-06 20:44:19.233 CEST" online="false"/>
</list>
```

### HTTP Request

`GET https://slipstream.sixsq.com/user`


## Get a specific user

```shell
curl https://slipstream.sixsq.com/user/<user> --user <user>:<password>
```

> The above command returns xml structured like this:

```xml
<?xml version="1.0"?>
<user deleted="false" resourceUri="user/test" name="test" email="test@sixsq.com" firstName="Test" lastName="User" organization="SixSq" issuper="false" state="ACTIVE" lastOnline="2014-05-07 20:16:44.580 CEST" creation="2014-05-07 20:15:28.664 CEST">
	<parameters>
		<entry>
			<string><![CDATA[ General.On Error Run Forever ]]></string>
			<parameter name="General.On Error Run Forever" description="If an error occurs, keep the execution running for investigation." category="General" mandatory="true" type="Boolean" readonly="false" order_="30" order="30">
				<value><![CDATA[ false ]]></value>
			</parameter>
		</entry>
		<entry>
			<string><![CDATA[ General.Verbosity Level ]]></string>
			<parameter name="General.Verbosity Level" description="Level of verbosity. 0 - Actions, 1 - Steps, 2 - Details data, 3 - Debugging." category="General" mandatory="true" type="Enum" readonly="false" order_="99" order="99">
				<enumValues length="4">
					<string>0</string>
					<string>1</string>
					<string>2</string>
					<string>3</string>
				</enumValues>
				<value><![CDATA[ 0 ]]></value>
			</parameter>
		</entry>
		<entry>
			<string><![CDATA[ General.Timeout ]]></string>
			<parameter name="General.Timeout" description="Minutes - When this timeout is reached, the execution is forcefully terminated." category="General" mandatory="true" type="String" readonly="false" order_="90" order="90">
				<value><![CDATA[ 30 ]]></value>
			</parameter>
		</entry>
		<entry>
			<string><![CDATA[ General.On Success Run Forever ]]></string>
			<parameter name="General.On Success Run Forever" description="If no errors occur, keep the execution running. Useful for deployment or long tests." category="General" mandatory="true" type="Boolean" readonly="false" order_="20" order="20">
				<value><![CDATA[ true ]]></value>
			</parameter>
		</entry>
		<entry>
			<string><![CDATA[ General.default.cloud.service ]]></string>
			<parameter name="General.default.cloud.service" description="Select which cloud you want to use." category="General" mandatory="true" type="Enum" readonly="false" order_="10" order="10">
				<enumValues length="0"/>
				<value><![CDATA[ ]]></value>
			</parameter>
		</entry>
		<entry>
			<string><![CDATA[ General.ssh.public.key ]]></string>
			<parameter name="General.ssh.public.key" description="SSH Public Key(s) (keys must be separated by new line) Warning: Some clouds may take into account only the first key." category="General" mandatory="true" type="RestrictedText" readonly="false" order_="40" order="40"/>
		</entry>
	</parameters>
</user>
```

This resource retrieves a specific user.

### HTTP Request

`GET https://slipstream.sixsq.com/user/<user>`

### URL Parameters

Parameter | Required | Description
--------- | -------- | -----------
user | true | The user to retrieve


# The *new* resource

To retrieve example resource structures, especially for resource types that don't yet exist,
you can use the special *new* resource.

### HTTP Request

`GET https://slipstream.sixsq.com/<type>/new[?category=Image]`

### Body Parameters

Parameter | Required | Description
--------- | -------- | -----------
type | true | Type of resource to retrieve (e.g. module, user)
category | false | Only required for *module* &lt;type>. Can be: *project* (default), *image* or *deployment*.

```shell
curl https://slipstream.sixsq.com/module/examples/new?category=Image login -d username=<USER> -d password=<PASSWORD>
```

> The above command returns a response body structured like this:

```xml
<imageModule category="Image" creation="2014-05-12 09:59:36.354 UTC" deleted="false" isBase="false" isLatestVersion="false" loginUser="" parentUri="module/Mebster" platform="" shortName="new" version="-1">
	<parameters>
		<entry>
			<string>instanceid</string>
			<parameter category="Output" description="Cloud instance id" isSet="false" mandatory="true" name="instanceid" order="0" order_="0" readonly="false" type="String"/>
		</entry>
		<entry>
			<string>extra.disk.volatile</string>
			<parameter category="Cloud" description="Volatile extra disk in GB" isSet="false" mandatory="true" name="extra.disk.volatile" order="0" order_="0" readonly="false" type="String"/>
		</entry>
		<entry>
			<string>ec2-eu-west.instance.type</string>
			<parameter category="ec2-eu-west" description="Cloud instance type" isSet="false" mandatory="true" name="ec2-eu-west.instance.type" order="0" order_="0" readonly="false" type="Enum">
				<enumValues length="10">
					<string>m1.small</string>
					<string>m1.large</string>
					<string>m1.xlarge</string>
					<string>c1.medium</string>
					<string>c1.xlarge</string>
					<string>m2.xlarge</string>
					<string>m2.2xlarge</string>
					<string>m2.4xlarge</string>
					<string>cc1.4xlarge</string>
					<string>t1.micro</string>
				</enumValues>
			</parameter>
		</entry>
		<entry>
			<string>exoscale-ch-gva.security.groups</string>
			<parameter category="exoscale-ch-gva" description="Security Groups (comma separated list)" isSet="true" mandatory="true" name="exoscale-ch-gva.security.groups" order="0" order_="0" readonly="false" type="String">
				<value>default</value>
				<defaultValue>default</defaultValue>
			</parameter>
		</entry>
		<entry>
			<string>ec2-eu-west.security.group</string>
			<parameter category="ec2-eu-west" description="Security groups (comma separated list)" isSet="true" mandatory="true" name="ec2-eu-west.security.group" order="0" order_="0" readonly="false" type="String">
				<value>default</value>
				<defaultValue>default</defaultValue>
			</parameter>
		</entry>
		<entry>
			<string>network</string>
			<parameter category="Cloud" description="Network type" isSet="true" mandatory="true" name="network" order="0" order_="0" readonly="false" type="Enum">
				<enumValues length="2">
					<string>Public</string>
					<string>Private</string>
				</enumValues>
				<value>Public</value>
				<defaultValue>Public</defaultValue>
			</parameter>
		</entry>
		<entry>
			<string>exoscale-ch-gva.instance.type</string>
			<parameter category="exoscale-ch-gva" description="Instance type (flavor)" isSet="false" mandatory="true" name="exoscale-ch-gva.instance.type" order="0" order_="0" readonly="false" type="String"/>
		</entry>
		<entry>
			<string>hostname</string>
			<parameter category="Output" description="hostname/ip of the image" isSet="false" mandatory="true" name="hostname" order="0" order_="0" readonly="false" type="String"/>
		</entry>
	</parameters>
	<authz groupCreateChildren="false" groupDelete="false" groupGet="false" groupPost="false" groupPut="false" inheritedGroupMembers="true" owner="meb" ownerCreateChildren="true" ownerDelete="true" ownerGet="true" ownerPost="true" ownerPut="true" publicCreateChildren="false" publicDelete="false" publicGet="false" publicPost="false" publicPut="false">
		<groupMembers />
	</authz>
	<cloudNames length="3">
		<string>exoscale-ch-gva</string>
		<string>ec2-eu-west</string>
		<string>default</string>
	</cloudNames>
	<runs/>
	<targets />
	<packages />
	<prerecipe/>
	<recipe/>
	<cloudImageIdentifiers />
</imageModule>
```

<aside class="notice">
On the root module resource (i.e. /module), only project category can be requested.
</aside>

<aside class="notice">
This also means that *new* is a reserved word and modules and users cannot be called new.
</aside>




# Errors

The SlipStream REST API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request is inconsistent
401 | Unauthorized -- Your username/password of cookie is wrong
403 | Forbidden -- You don't have the rights to perform this action
404 | Not Found -- The requested resource doesn't exist
405 | Method Not Allowed -- You tried to access a resource with an invalid method
406 | Not Acceptable -- You requested a format that is not supported
418 | I'm a teapot -- The all time classic :-)
500 | Internal Server Error -- We have a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintenance. Please try again later.
