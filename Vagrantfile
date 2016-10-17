# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"


  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 22, host: 2122, id: "ssh"
  config.vm.network "forwarded_port", guest: 4040, host: 4040
  for i in 3000..3009
    config.vm.network :forwarded_port, guest: i, host: i
  end


  config.vm.synced_folder ".", "/vagrant", fsnotify: true
  
  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    #vb.gui = true

    # vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
    # Customize the amount of memory on the VM:
    vb.memory = "4072"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    echo "Provisioning Virtual Machine..."
    sudo apt-get update

    echo "Installing developer packages..."
    sudo apt-get install build-essential curl vim g++ -y > /dev/null

    echo "Installing Git..."
    sudo apt-get install git -y > /dev/null

  SHELL
  
  config.vm.provision "shell", inline: <<-SCRIPT
    print "Installing docker pre-requisites\n"
    apt-get install -y apt-transport-https ca-certificates

    print "Adding GPG key\n"
    apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
  SCRIPT
  
  config.vm.provision "shell", name: "add docker repo", inline: "tee /etc/apt/sources.list.d/docker.list <<-'EOF'
deb https://apt.dockerproject.org/repo ubuntu-trusty main
EOF"

	config.vm.provision "shell", name: "update repository", inline: "apt-get update"
	config.vm.provision "shell", name: "autoremove repository", inline: "apt-get autoremove -y"
	config.vm.provision "shell", name: "installing extra images", inline: "apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual"
	config.vm.provision "shell", name: "installing docker engine", inline: "apt-get install -y docker-engine"
	config.vm.provision "shell", name: "adding docker group", inline: "groupadd docker ||true"
	config.vm.provision "shell", name: "adding vagrant to docker group", inline: "usermod -aG docker vagrant"
  config.vm.provision "shell", name: "installing docker compose", inline: "curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose"
	
	#liquid prompt installation
  $liquidPrompt = <<SCRIPT
mkdir -p /home/vagrant/tools/
cd /home/vagrant/tools
git clone https://github.com/nojhan/liquidprompt.git
SCRIPT

   config.vm.provision "shell", name: "liquidPrompt", privileged: false, inline: $liquidPrompt
   config.vm.provision "file", source: "Vagrantbashrc", destination: "/home/vagrant/.bashrc"
   config.vm.provision "file", source: "Vagrantbash_aliases", destination: "/home/vagrant/.bash_aliases"
	
end
