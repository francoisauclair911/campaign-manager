<?php

namespace includes\helper;

trait HelperTrait {
    
    protected function isDevelopement() {
        $currentDomain = (end(explode(".", $_SERVER['HTTP_HOST'])));
        $possibleDomains = ['test', 'loc', 'local', 'dev'];
        
        return (in_array($currentDomain, $possibleDomains));
    }
    
    
}